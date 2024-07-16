import React from 'react';
import LinkNext from 'next/link';

import styles from './style.module.scss';

export const LinkButton = ({ text, href, target, ariaLabel }: { text: string, href: string, target?: string, ariaLabel?: string }) => {
    return <LinkNext prefetch={ false } aria-label={ ariaLabel } href={ href } target={ target } className={ styles.button }>{text}</LinkNext>;
};
