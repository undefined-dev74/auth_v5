import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { SuccessMsgResponse, SuccessResponse } from '../core/ApiResponse';
import { authService, emailService, tokenService, userService } from '../services';
import catchAsync from '../utils/catchAsync';
import exclude from '../utils/exclude';

const register = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userService.createUser(email, password, name);
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  new SuccessResponse('User registration successful', { user: userWithoutPassword, tokens }).send(
    res
  );
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  new SuccessResponse('Login Successfully', { user, tokens }).send(res);
  // res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  new SuccessMsgResponse('Password reset email sent to ' + req.body.email).send(res);
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token as string, req.body.new_password);
  new SuccessMsgResponse('Password reset successfully').send(res);
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const user = req.user as User;
  const currentUser = await userService.getUserById(user.id);
  if (currentUser?.isEmailVerified) {
    new SuccessMsgResponse('Email already verified').send(res);
    return;
  }
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  new SuccessMsgResponse('Verification email sent to ' + user.email).send(res);
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token as string);
  new SuccessMsgResponse('Email verified successfully').send(res);
});

const verifyResetToken = catchAsync(async (req, res) => {
  const { token } = req.query;
  await tokenService.verifyResetPasswordToken(token as string);
  res.status(httpStatus.OK).send({ message: 'Token is valid' });
});

const googleOAuthLogin = catchAsync(async (req, res) => {
  try {
    const rootUrl = process.env.GOOGLE_OAUTH_BASE_URL;
    const options = {
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' ')
    };

    const qs = new URLSearchParams(options as any);
    const url = `${rootUrl}?${qs.toString()}`;
    res.redirect(url);
  } catch (error) {
    console.log('ERROR on GOOGLE OAUTH', error);
  }
});

const googleOAuthCallback = catchAsync(async (req, res) => {
  console.log('Entering googleOAuthCallback');
  const { code } = req.query;
  console.log('Received code:', code);

  try {
    const { id_token, access_token } = await authService.getGoogleOauthToken(code as string);
    console.log('Tokens received successfully');

    const googleUser = await authService.getGoogleUser({ id_token, access_token });
    console.log('Google user info:', googleUser);

    if (!googleUser?.verified_email) {
      return res.redirect(
        `${process.env.OAUTH_CLIENT_URL}/oauth/error?message=Google account not verified`
      );
    }

    const user = await userService.upsertUser({
      email: googleUser.email,
      name: googleUser.name,
      verified_email: googleUser.verified_email,
      picture: googleUser.picture
    });
    const tokens = await tokenService.generateAuthTokens(user);

    console.log('User upserted:', user);

    // Redirect to React application with user and tokens as query parameters
    const redirectUrl = new URL(`${process.env.OAUTH_CLIENT_URL}/home`);
    res.cookie('accessToken', tokens.access.token);
    res.cookie('refreshToken', tokens.refresh?.token);
    redirectUrl.searchParams.append(
      'user',
      JSON.stringify({ id: user.id, name: user.name, email: user.email })
    );
    redirectUrl.searchParams.append('tokens', JSON.stringify(tokens));

    console.log('Redirecting to:', redirectUrl.toString());
    res.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Error in googleOAuthCallback:', error);
    res.redirect(`${process.env.OAUTH_CLIENT_URL}/oauth/error`);
  }
});

const githubOauthHandler = catchAsync(async (req, res) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.json({ error: 'authorization code not provided' });
    }
    // Get access_token using code
    const { access_token } = await authService.getGithubOathToken({ code });

    // Get user details using access token
    const githubUser = await authService.getGithubUser({ access_token });
    console.log('USER DATA FROM GITHUB', githubUser);
    if (!githubUser?.email) {
      return res.redirect(
        `${process.env.OAUTH_CLIENT_URL}/oauth/error?message=github account not verified or email has been not set to Public`
      );
    }
    const user = await userService.upsertUser({
      email: githubUser?.email,
      verified_email: true,
      name: githubUser?.name,
      picture: githubUser?.avatar_url
    });
    const tokens = await tokenService.generateAuthTokens(user);
    // Redirect to React application with user and tokens as query parameters
    const redirectUrl = new URL(`${process.env.OAUTH_CLIENT_URL}/home`);
    res.cookie('accessToken', tokens.access.token);
    res.cookie('refreshToken', tokens.refresh?.token);
    // redirectUrl.searchParams.append('tokens', JSON.stringify(tokens.access.token));

    console.log('Redirecting to:', redirectUrl.toString());
    res.redirect(redirectUrl.toString());
  } catch (error) {
    console.log('Error in githubOAuthCallback:', error);
    res.redirect(`${process.env.OAUTH_CLIENT_URL}/oauth/error`);
  }
});
export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  verifyResetToken,
  googleOAuthLogin,
  googleOAuthCallback,
  githubOauthHandler
};
