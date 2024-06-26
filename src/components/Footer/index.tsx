import React from 'react';

import { LinkButton } from '@/components/UI';

import styles from './style.module.scss';

export const Footer = () => {
    return (
        <footer className={ styles.footer }>
            <div className={ styles.footerWrapper }>
                <p>© { new Date().getFullYear() } cvevo</p>
                <p>by <LinkButton target={ '_blank' } text='Volodymyr Pastukh' href={ 'https://www.linkedin.com/in/pastukh/' }/></p>
            </div>
        </footer>
    );
};
