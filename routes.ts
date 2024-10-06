/**
 * Configuration file for route-based authentication and redirection in the application.
 * This file defines various arrays of routes used for authentication purposes.
 */

/**
 * Array of public routes that don't require authentication.
 * Users can access these routes whether they are logged in or not.
 * @type {string[]}
 */
export const publicPage: string[] = ["/", "/new-verification"]; // putting new verification page here so that user can change email from settings page

/**
 * Array of protected routes that require authentication.
 * Users must be logged in to access these routes.
 * If a non-authenticated user tries to access these routes, they should be redirected to the login page.
 * @type {string[]}
 */
export const protectedPage: string[] = ["/settings"];

/**
 * Array of authentication-related routes.
 * These routes are publicly accessible, but logged-in users accessing these routes
 * will be redirected to the default redirect page (typically a dashboard or home page).
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/sign-in"];

/**
 * Array of API route prefixes used for authentication purposes.
 * These routes are typically handled by the authentication library (e.g., NextAuth.js)
 * and should not be interfered with by the application's routing logic.
 * @type {string}
 */
export const apiRoutePrefix: string = "/api/auth";

/**
 * The default redirect path for authenticated users.
 * This is typically used when a logged-in user tries to access login/signup pages,
 * or after a successful login.
 * @type {string}
 */
export const defaultRedirect: string = "/settings";
