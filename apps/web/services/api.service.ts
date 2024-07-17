// axios
import axios from "axios";
// js cookie
import Cookies from "js-cookie";

export abstract class APIService {
  protected baseURL: string;
  protected headers: any = {};

  constructor(_baseURL: string) {
    this.baseURL = _baseURL;
  }

  setRefreshToken(token: string) {
    Cookies.set("refreshToken", token, {
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    // Set for server-side access
    document.cookie = `refreshToken=${token}; path=/; max-age=2592000; SameSite=Lax; Secure; HttpOnly`;
  }

  getRefreshToken() {
    return Cookies.get("refreshToken");
  }

  purgeRefreshToken() {
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly";
    Cookies.remove("refreshToken", { path: "/" });
  }

  setAccessToken(token: string) {
    Cookies.set("accessToken", token, {
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    // This sets a cookie that's accessible both client and server-side
    document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Lax`;
  }

  getAccessToken() {
    return Cookies.get("accessToken");
  }

  purgeAccessToken() {
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure";
    Cookies.remove("accessToken", { path: "/" });
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
  }

  get(url: string, config = {}): Promise<any> {
    return axios({
      method: "get",
      url: this.baseURL + url,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  post(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "post",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  put(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "put",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  patch(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "patch",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  delete(url: string, data?: any, config = {}): Promise<any> {
    return axios({
      method: "delete",
      url: this.baseURL + url,
      data: data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  mediaUpload(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "post",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken()
        ? { ...this.getHeaders(), "Content-Type": "multipart/form-data" }
        : {},
      ...config,
    });
  }

  request(config = {}) {
    return axios(config);
  }
}
