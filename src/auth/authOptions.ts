import GoogleProvider from 'next-auth/providers/google';
import { DB } from '@/db';

export const authOptions = {
    trustHost: true,
    // @ts-ignore
    adapter: DB(process.env.DB),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    pages: {
        signIn: '/api/signin',
    },
    callbacks: {},
}
