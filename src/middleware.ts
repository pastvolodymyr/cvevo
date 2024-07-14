import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth(req => {
    const url = new URL(req.url);

    if (url.searchParams.has('_rsc')) {
        return NextResponse.next();
    }

    if (!req.auth) {
        const newUrl = new URL(`/api/signin?callbackUrl=${req.url}`, req.nextUrl.origin)

        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: [
        '/analyse',
        '/account',
    ],
}

