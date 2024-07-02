import React from 'react';
import cx from 'classnames';

import styles from './style.module.scss';

export const ContentSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <section className={ cx(styles.contentSection, className) }>
            {children}
        </section>
    );
};
