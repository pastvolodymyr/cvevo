'use client'

import { getSession, SessionProvider } from "next-auth/react"
import React, { useEffect, useState } from 'react';

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode
}): React.ReactNode => {
    const [ session, setSession ] = useState(null);

    useEffect(() => {
        getSession().then(res => {
            // @ts-ignore
            return setSession(res);
        })
    }, []);

    return <SessionProvider session={ session }>
        {children}
    </SessionProvider>
}
