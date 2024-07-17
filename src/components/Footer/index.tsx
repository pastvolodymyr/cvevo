import React from 'react';

import { LinkButton } from '@/components/UI';

import styles from './style.module.scss';

export const Footer = () => {
    return (
        <footer className={ styles.footer }>
            <p>© { new Date().getFullYear() } cvevo</p>
            <div className={ styles.links }>
                <LinkButton ariaLabel={ 'Privacy policy page' } text='Privacy Policy' href={ '/privacy' }/>
                <LinkButton ariaLabel={ 'Contact page' } text='Contact' href={ '/privacy#contact' }/>
            </div>
        </footer>
    );
};
