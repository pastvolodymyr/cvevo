import { auth, signIn } from '@/auth';
// @ts-ignore
import { NextAuthRequest } from 'next-auth/lib';

// eslint-disable-next-line no-unused-vars
export const isAuth = (handler: (req: NextAuthRequest) => void) => {
    return auth(async function Route(req) {
        if (!req.auth) {
            const { searchParams } = new URL(req.url);

            return signIn("google", { redirectTo: searchParams.get("callbackUrl") ?? "" });
        }

        return handler(req);
    });
}
