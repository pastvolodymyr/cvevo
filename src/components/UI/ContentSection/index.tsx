import React from 'react';

import styles from './style.module.scss';

export const ContentSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className={ styles.contentSection }>
            {children}
        </section>
    );
};
