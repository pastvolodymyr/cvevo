import GoogleProvider from 'next-auth/providers/google';
import { DB } from '@/db';

export const authOptions = {
    trustHost: true,
    adapter: DB(),
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
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    pages: {
        signIn: '/api/signin',
    },
    callbacks: {},
}
