import React from 'react';

import styles from './style.module.scss';
import cx from 'classnames';

export const Button = ({ text, onClick, disabled }: { text: string, onClick?: () => void, disabled?: boolean }) => {
    return <button className={ cx(styles.button, { [styles.buttonDisabled]: disabled }) } onClick={ !disabled ? onClick : () => {} }>{text}</button>;
};
