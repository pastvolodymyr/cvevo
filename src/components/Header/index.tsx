import React from 'react';
import Link from 'next/link';

import Logo from '@/svg/logo.svg';
import { Button, LinkButton } from '@/components/UI';

import styles from './style.module.scss';

export const Header = () => {
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
                <Link prefetch={ false } href={ '/' } className={ styles.logo }>
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
                            <Link prefetch={ false } href={ '/account' }><Button text={ 'My Account' } /></Link>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};
