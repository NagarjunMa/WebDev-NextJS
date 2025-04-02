import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/client";
import bcrypt from 'bcryptjs';
import type { DefaultSession, AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"


// Extend the default session type
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

// Auth.js configuration with correct types
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // This is where you would verify the credentials
                // For example, check against a database
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                // Simple example:
                if (credentials.username === "admin" && credentials.password === "password") {
                    return {
                        id: "1",
                        name: "Admin",
                        email: "admin@example.com",
                    };
                }
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username,
                    },
                });

                if (!user) return null;

                const passMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);

                return passMatch ? user : null; // Return user object if credentials are valid
                // If credentials are invalid, return null
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",     // Optional: custom error page
    },
    callbacks: {
        session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
};

// Create auth handler
const handler = NextAuth(authOptions);

// Export a server-side auth function
export async function auth() {
    return await getServerSession(authOptions);
}

// Export the handlers for API routes
export const GET = handler;
export const POST = handler;

// Export other functions that might be needed
export const { signIn, signOut } = handler;

// Export middleware for route protection
export { default as middleware } from "next-auth/middleware";