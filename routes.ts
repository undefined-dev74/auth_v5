/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An Array of routes that are used for authentications
 * These routes will redicrect to logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
