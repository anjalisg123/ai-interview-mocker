import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 1. Add '/' to the protected routes list
const isProtectedRoute = createRouteMatcher([
    '/', 
    '/dashboard(.*)', 
    '/forum(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
    // 2. This checks if the user is on Home or Dashboard.
    // If they are NOT logged in, it automatically kicks them to the Sign-In page.
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};