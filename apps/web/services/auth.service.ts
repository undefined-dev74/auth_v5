// services

import {
  IApiResponse,
  ILoginTokenResponse,
  IPasswordSignInData,
} from "@repo/types";
import { API_BASE_URL } from "@/utils/helpers";
import { APIService } from "@/services/api.service";
// helpers

// types
console.log(API_BASE_URL);
export class AuthService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async passwordSignIn(
    data: IPasswordSignInData
  ): Promise<IApiResponse<ILoginTokenResponse>> {
    return this.post("/auth/login", data, { headers: {} })
      .then((response) => {
        console.log(response);
        this.setAccessToken(response?.data.data.tokens?.access.token);
        this.setRefreshToken(response?.data.data?.tokens.refresh.token);
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async sendResetPasswordLink(data: { email: string }): Promise<any> {
    return this.post(`/auth/forgot-password/`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response;
      });
  }

  async setPassword(data: { password: string }): Promise<any> {
    return this.post(`/api/users/me/set-password/`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async resetPassword(
    token: string,
    data: {
      new_password: string;
    }
  ): Promise<IApiResponse<ILoginTokenResponse>> {
    return this.post(`/auth/reset-password?token=${token}`, data, {
      headers: {},
    })
      .then((response) => {
        if (response?.status === 200) {
          this.setAccessToken(response?.data.data.tokens?.access.token);
          this.setRefreshToken(response?.data.data?.tokens.refresh.token);
          return response?.data;
        }
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async emailSignUp(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<IApiResponse<ILoginTokenResponse>> {
    return this.post("/auth/register", data, { headers: {} })
      .then((response) => {
        this.setAccessToken(response?.data.data.tokens?.access.token);
        this.setRefreshToken(response?.data.data?.tokens.refresh.token);
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async socialAuth(data: any): Promise<IApiResponse<ILoginTokenResponse>> {
    return this.post("/api/social-auth/", data, { headers: {} })
      .then((response) => {
        this.setAccessToken(response?.data?.access_token);
        this.setRefreshToken(response?.data?.refresh_token);
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async generateUniqueCode(data: { email: string }): Promise<any> {
    return this.post("/api/magic-generate/", data, { headers: {} })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async signOut(): Promise<any> {
    return this.post("/api/sign-out/", {
      refresh_token: this.getRefreshToken(),
    })
      .then((response) => {
        this.purgeAccessToken();
        this.purgeRefreshToken();
        return response?.data;
      })
      .catch((error) => {
        this.purgeAccessToken();
        this.purgeRefreshToken();
        throw error?.response?.data;
      });
  }

  async verifyResetToken(token: string): Promise<void> {
    return this.get(`/auth/verify-reset-token/?token=${token}`, { headers: {} })
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  }
}
