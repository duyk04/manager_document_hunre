import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
    DEAFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRouters,
    publicRouters
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth?.user;
    // console.log("ROUTE", req.nextUrl.pathname);
    // console.log("IS LOGIN", isLoggedIn);

    const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRouters.includes(nextUrl.pathname);
    const isAuthRoute = authRouters.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return undefined;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEAFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return undefined;
    }

    if (!isLoggedIn && !isPublicRoute) {
        // console.log("REDIRECT TO LOGIN");
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return undefined;
})

export const config = {
    matcher: [
        // "/auth/register",
        // "/auth/login",
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ]
}
