import React from 'react';
import LinkNext from 'next/link';

import styles from './style.module.scss';

export const LinkButton = ({ text, href, target }: { text: string, href: string, target?: string }) => {
    return <LinkNext href={ href } target={ target } className={ styles.button }>{text}</LinkNext>;
};
