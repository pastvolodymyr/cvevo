import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    response_type: 'code',
                    prompt: "consent",
                    scope: "openid email profile",
                },
            },
        }),
    ],
    callbacks: {
        // @ts-ignore
        // eslint-disable-next-line no-unused-vars
        async signIn({ user, account }) {
            // const { email, name, image, id, provider } = user;
            // const collection = db.collection('users');
            // const findUser = await collection.findOne({ providerAccountId: id });
            //
            // if (findUser) {
            //     return true;
            // } else {
            //     const createUserInDb = await collection.insertOne({
            //         email,
            //         name,
            //         avatar: image,
            //         providerAccountId: id,
            //         provider,
            //         lastUpdated: Date.now(),
            //         pokedexEntries: 0,
            //     });
            // }
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
