import { auth } from '@/auth';

export default auth(req => {
    const url = new URL(req.url);

    if (!req.auth && !url.searchParams.has('_rsc')) {
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

