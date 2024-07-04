"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';

import Logo from '@/svg/logo.svg';
import { Button, LinkButton } from '@/components/UI';

import styles from './style.module.scss';

export const Header = () => {
    const { status } = useSession();

    const pageParams = useSearchParams()
    const router = useRouter()


    useEffect(() => {
        const login = pageParams.get('login')
        const page = pageParams.get('page')


        if(login && page) {
            router.replace('/')

            if(status === 'unauthenticated') {
                router.replace('/')
                signIn('google', {
                    redirect: true,
                    callbackUrl: `/${page}`,
                })
            }
        }
    }, [ pageParams, router, status ]);

    const links = [
        {
            href: '/analyse',
            label: 'Analyse CV',
        },
        {
            href: '/pricing',
            label: 'Pricing',
        },
    ];

    return (
        <header className={ styles.header }>
            <div className={ styles.headerContent }>
                <Link href={ '/' } className={ styles.logo }>
                    <Logo />
                </Link>
                <ul className={ styles.navigation }>
                    {
                        links.map(link => (
                            <li key={ link.label }>
                                <LinkButton text={ link.label } href={ link.href }/>
                            </li>
                        ))
                    }
                    <li key={ 'account' }>
                        <div className={ styles.loginBlock }>
                            {
                                status === 'authenticated'
                                    ? <Link href={ '/account' }><Button text={ 'My account' } /></Link>
                                    : <Button text={ 'Sign in' } onClick={ () => signIn('google') }/>
                            }
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};
