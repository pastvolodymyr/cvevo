import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/store/mongo/mongodb';
import User from '@/store/mongo/models/User';

export const authOptions = {
    trustHost: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    response_type: 'code',
                    prompt: "consent",
                    scope: "email profile",
                },
            },
        }),
    ],
    pages: {
        signIn: '/api/signin',
    },
    callbacks: {
        // @ts-ignore
        // eslint-disable-next-line no-unused-vars
        async signIn({ user, account }) {
            const { email, name } = user;

            await connectDB();
            const userFound = await User.findOne({ email });

            if (userFound) {
                return true;
            } else {
                const user = new User({
                    name,
                    email,
                    tokens: 1,
                    freeTrial: true,
                });

                await user.save();
            }
            return true;
        },
        // @ts-ignore
        // eslint-disable-next-line no-unused-vars
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        // @ts-ignore
        // eslint-disable-next-line no-unused-vars
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        },
    },
}
