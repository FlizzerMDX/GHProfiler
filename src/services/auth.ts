import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.account = account;
                token.profile = profile;
            }
            return token;
        },
        async session({ session, token, user }) {
            return {
                ...session,
                user: {...session.user, username: token?.profile?.login},
                accessToken: token.accessToken,
            };
        },
    },
})