'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';

import Logo from '@/svg/logo.svg';
import { Button, LinkButton } from '@/components/UI';

import styles from './style.module.scss';
import { useAppDispatch } from '@/store/hooks';
import { getUserData } from '@/store/thunks/user.thunks';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { userSelector } from '@/store/selectors/user.selector';

export const Header = () => {
    const user = useSelector(userSelector)
    const dispatch = useAppDispatch();
    const path = usePathname();

    const links = [
        {
            href: '/analyse',
            label: 'CV analyser',
        },
        {
            href: '/pricing',
            label: 'Pricing',
        },
        {
            href: '/account',
            label: 'My Account',
        },
    ];

    useEffect(() => {
        const userDataPaths = [ '/analyse', '/account' ]

        if(!user.data && !user.loading && userDataPaths.includes(path)) {
            dispatch(getUserData())
        }
    }, [ user, path, dispatch ])

    return (
        <nav className={ styles.header }>
            <Link aria-label='Home page' prefetch={ true } href={ '/' } className={ styles.logo }>
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
            </ul>
        </nav>
    );
};
