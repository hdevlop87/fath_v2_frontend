import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

export const authOption = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password", placeholder: "123456" },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                );
                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }

                throw new Error('Invalid username or password.');
            },
        }),
    ],

    pages: {
        signIn: "/login",
        error: '/login',
        signOut: '/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user.user };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
}

export const getAuthSession = () => {
    return getServerSession(authOption);
};