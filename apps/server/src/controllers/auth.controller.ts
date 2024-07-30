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

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  verifyResetToken
};
