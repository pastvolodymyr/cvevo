import React, { ElementType } from 'react';
import cx from 'classnames';

import styles from './style.module.scss';

export const ContentSection = ({ children, className, as: Tag = 'div' }: { children: React.ReactNode, className?: string, as?: ElementType }) => {

    return (
        <Tag className={ cx(styles.contentSection, className) }>
            { children }
        </Tag>
    );
};
