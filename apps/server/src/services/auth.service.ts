import httpStatus from 'http-status';
import tokenService from './token.service';
import userService from './user.service';
import ApiError from '../utils/ApiError';
import { TokenType, User } from '@prisma/client';
import prisma from '../client';
import { encryptPassword, isPasswordMatch } from '../utils/encryption';
import { AuthTokensResponse } from '../types/response';
import exclude from '../utils/exclude';
import axios from 'axios';
import QueryString from 'qs';
import { GitHubOauthToken, GoogleUser } from '@repo/types';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  const user = await userService.getUserByEmail(email, [
    'id',
    'email',
    'name',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ]);
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  if (!user.isEmailVerified) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please verify your email before logging in');
  }
  return exclude(user, ['password']);
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenData = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH,
      blacklisted: false
    }
  });
  if (!refreshTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await prisma.token.delete({ where: { id: refreshTokenData.id } });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */
const refreshAuth = async (refreshToken: string): Promise<AuthTokensResponse> => {
  try {
    const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
    const { userId } = refreshTokenData;
    await prisma.token.delete({ where: { id: refreshTokenData.id } });
    return tokenService.generateAuthTokens({ id: userId });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<void> => {
  try {
    const resetPasswordTokenData = await tokenService.verifyToken(
      resetPasswordToken,
      TokenType.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenData.userId);
    if (!user) {
      throw new Error();
    }
    const encryptedPassword = await encryptPassword(newPassword);
    await userService.updateUserById(user.id, { password: encryptedPassword });
    await prisma.token.deleteMany({ where: { userId: user.id, type: TokenType.RESET_PASSWORD } });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error as string);
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<void>}
 */
const verifyEmail = async (verifyEmailToken: string): Promise<void> => {
  try {
    const verifyEmailTokenData = await tokenService.verifyToken(
      verifyEmailToken,
      TokenType.VERIFY_EMAIL
    );
    // Check if the user is already verified
    const user = await userService.getUserById(verifyEmailTokenData.userId);

    if (user?.isEmailVerified) {
      // If already verified, just delete the token and return
      await prisma.token.delete({ where: { id: verifyEmailTokenData.id } });
      return;
    }
    const updatedUser = await userService.updateUserById(verifyEmailTokenData.userId, {
      isEmailVerified: true
    });

    if (!updatedUser) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update user');
    }

    // Only after successful verification, delete the token
    await prisma.token.deleteMany({
      where: { userId: verifyEmailTokenData.userId, type: TokenType.VERIFY_EMAIL }
    });
    console.log('Email verified successfully for user:', updatedUser.id);
  } catch (error) {
    console.error('EMAIL VERIFICATION ERROR', error);
    if (error instanceof Error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, `Email verification failed: ${error.message}`);
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

/**
 * get Google Oauth Tokens
 * @param {string} code
 * @returns {Promise<any>}
 */
export const getGoogleOauthToken = async (code: string) => {
  const rootURl = 'https://oauth2.googleapis.com/token';
  console.log('CODE', code);
  const options = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: 'authorization_code'
  };
  try {
    const { data } = await axios.post(rootURl, QueryString.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log('DATA in getGoogleOauth', data);
    return data;
  } catch (err) {
    console.log('Failed to fetch Google Oauth Tokens', err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch Google Oauth Tokens');
  }
};

/**
 * Get Google User
 * @param {string} {id_token, access_token}
 * @returns {Promise<GoogleUser>}
 */
export const getGoogleUser = async ({
  id_token,
  access_token
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUser> => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
          Accept: 'application/json'
        }
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
  }
};

/**
 * get Github Oauth Tokens
 * @param {string} code
 * @returns {Promise<any>}
 */
export const getGithubOathToken = async ({ code }: { code: string }): Promise<any> => {
  const rootUrl = process.env.GITHUB_OAUTH_ROOT_URI;
  const options = {
    client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
    client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    code
  };

  const queryString = QueryString.stringify(options);

  try {
    const { data } = await axios.post(`${rootUrl}?${queryString}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const decoded = QueryString.parse(data) as GitHubOauthToken;
    return decoded;
  } catch (err: any) {
    throw Error(err);
  }
};

/**
 * Get Github User
 * @param {GitHubOauthToken} {access_token}
 * @returns {Promise<any>}
 */
export const getGithubUser = async ({ access_token }: GitHubOauthToken): Promise<any> => {
  try {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json'
      }
    });

    return data;
  } catch (err: any) {
    throw Error(err);
  }
};

export default {
  loginUserWithEmailAndPassword,
  isPasswordMatch,
  encryptPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  getGoogleOauthToken,
  getGoogleUser,
  getGithubUser,
  getGithubOathToken
};
