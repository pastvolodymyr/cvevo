import { isAuth } from '@/app/api/middleware/isAuth';
import { NextResponse } from 'next/server';
import { DB } from '@/db';

export const GET = isAuth(async function (req) {
    const { getUser } = DB();

    const userId = req.auth?.user?.id;
    const user = await getUser?.(userId);

    return NextResponse.json(user, { status: 200 });
})

export const PATCH = isAuth(async function (req) {
    const { getUser, updateUser } = DB();

    const userId = req.auth?.user?.id;
    const user = await getUser(userId);

    const params = {
        ...user,
        isFree: false,
        tokens: !!user.tokens ? user.tokens - 1 : 0,
    }

    const updatedUser = await updateUser(params)

    return NextResponse.json(updatedUser, { status: 200 });
})

export const runtime = "edge";
