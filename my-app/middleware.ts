// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/auth';

// export async function middleware(request: NextRequest) {
//     // Get the pathname of the request

//     // Get authentication status
//     const session = await auth();

//     // If user is not authenticated and is trying to access a protected route
//     if (!session) {
//         // Create the login URL with the callback to return after login
//         const loginUrl = new URL('/login', request.url);
//         loginUrl.searchParams.set('callbackUrl', request.url);
//         return NextResponse.redirect(loginUrl);
//     }

//     return NextResponse.next();
// }

// // Configure the paths that should be protected
// export const config = {
//     matcher: [
//         '/dashboard/:path*',
//         '/admin/:path*',
//         '/users/:path*',
//         '/products/:path*',
//         '/api/protected/:path*',
//     ],
// };

import { withAuth } from "next-auth/middleware";

// Use withAuth middleware
export default withAuth({
    pages: {
        signIn: "/login",
    }
});

// Configure the paths that should be protected, 
// make sure to exclude /login, /api/auth, etc.
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/users/:path*",
        "/products/:path*",
        "/api/protected/:path*",
        // Exclude paths below
        "/((?!api|_next/static|_next/image|favicon.ico|login|api/auth).*)",
    ],
};