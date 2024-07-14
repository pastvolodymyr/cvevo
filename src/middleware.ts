import { auth } from '@/auth';

export default auth(req => {
    if (!req.auth) {
        const newUrl = new URL(`/api/signin?callbackUrl=${req.url}`, req.nextUrl.origin)

        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: [ '/analyse', '/account' ],
}

