/* eslint-disable prettier/prettier */
export interface GoogleUser {
  id?: string
  email?: string
  verified_email: boolean
  name: string
  given_name?: string
  family_name?: string
  picture: string
}
export interface OAuthUser {
  email: string | undefined;
  name: string;
  verified_email: boolean;
  picture?: string;
}

export type GitHubOauthToken = {
  access_token: string;
};