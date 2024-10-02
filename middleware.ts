import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
	protectedPage,
	publicPage,
	apiRoutePrefix,
	authRoutes,
	defaultRedirect,
} from "./routes";

const { auth } = NextAuth(authConfig);

// you can decide what to do with the logged in user here
export default auth((req) => {
	// req.auth

	// use in this order, otherwise you may get in infinite redirect loop
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
	const isPublicRoute = publicPage.includes(nextUrl.pathname);
	const isProtectedRoute = protectedPage.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	// Allow API to proceed without redirection
	if (isApiAuthRoute) {
		return null;
	}

	// Redirect logged-in users away from auth routes
	if (isLoggedIn && isAuthRoute) {
		return Response.redirect(new URL(defaultRedirect, nextUrl));
	}

	// Redirect non-logged-in users to login page if trying to access protected routes
	if (!isLoggedIn && isProtectedRoute) {
		return Response.redirect(new URL("/login", nextUrl));
	}

	return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
// This matcher was taken from clerk
// whatever route you put here based on how, will run above function

// The first matcher is a complex regular expression that:
// Excludes Next.js internal routes (_next)
// Excludes static files (like .html, .css, .js, images, fonts, etc.)
// But includes these excluded paths if they're found in search parameters
// The second matcher ensures the middleware always runs for API routes (/api/*) and tRPC routes (/trpc/*).
