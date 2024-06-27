import React from 'react';

import styles from './style.module.scss';

export const ContentSection = ({ children }) => {
    return (
        <section className={styles.contentSection}>
            {children}
        </section>
    );
};
