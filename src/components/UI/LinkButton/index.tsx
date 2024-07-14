import React from 'react';
import LinkNext from 'next/link';

import styles from './style.module.scss';

export const LinkButton = ({ text, href, target, ariaLabel }: { text: string, href: string, target?: string, ariaLabel?: string }) => {
    return <LinkNext aria-label={ ariaLabel } prefetch={true} href={ href } target={ target } className={ styles.button }>{text}</LinkNext>;
};
