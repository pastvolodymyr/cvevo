import NextAuth from "next-auth"
import { authOptions } from './authOptions';

// @ts-ignore
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
