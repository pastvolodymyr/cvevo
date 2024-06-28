import React from 'react';
import Link from 'next/link';

import Logo from '@/svg/logo.svg';
import { LinkButton } from '@/components/UI';

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
        // {
        //     href: '/analyse',
        //     label: 'Account',
        // },
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
                                {/*{*/}
                                {/*    link.onClick*/}
                                {/*        ? <Button text={ link.label } onClick={ link.onClick }/>*/}
                                {/*        : <LinkButton text={ link.label } href={ link.href }/>*/}
                                {/*}*/}
                                <LinkButton text={ link.label } href={ link.href }/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </header>
    );
};
