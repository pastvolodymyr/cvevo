import { auth } from '@/auth';

export default auth(req => {
    const url = new URL('http://localhost:3000/analyse?_rsc=1wtp7');

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

