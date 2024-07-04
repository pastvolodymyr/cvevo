"use server";

import { auth } from '@/auth';

export const getSession = async () => {
    'use server'
    return await auth()
}
