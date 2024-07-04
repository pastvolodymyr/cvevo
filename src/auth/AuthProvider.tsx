'use client'

import { getSession, SessionProvider } from "next-auth/react"
import React, { useCallback, useEffect, useState } from 'react';
import { Session } from 'next-auth';

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode
}): React.ReactNode => {
    const [ session, setSession ] = useState<Session | null>(null);

    const fetchSession = useCallback(async () => {
        const session = await getSession();

        setSession(session);
    }, []);

    useEffect(() => {
        fetchSession();
    }, [ fetchSession ]);

    return <SessionProvider session={ session }>
        {children}
    </SessionProvider>
}
