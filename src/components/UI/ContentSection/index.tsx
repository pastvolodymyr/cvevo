import React, { ElementType } from 'react';
import cx from 'classnames';

import styles from './style.module.scss';

export const ContentSection = ({ children, className, as: Tag = 'div', onClick }: { children: React.ReactNode, className?: string, as?: ElementType, onClick?: () => void }) => {
    return (
        <Tag className={ cx(styles.contentSection, className) } onClick={ onClick }>
            { children }
        </Tag>
    );
};
