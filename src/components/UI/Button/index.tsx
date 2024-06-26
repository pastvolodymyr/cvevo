'use client';
import React from 'react';

import styles from './style.module.scss';

export const Button = ({ text, onClick }: { text: string }) => {
    return <button className={ styles.button } onClick={ onClick }>{text}</button>;
};
