import React from 'react';
import cx from 'classnames';

import styles from './style.module.scss';

export const Button = ({ text, onClick, disabled }: { text: string, onClick?: () => void, disabled?: boolean }) => {
    return <button className={ cx(styles.button, { [styles.buttonDisabled]: disabled }) } onClick={ !disabled ? onClick : () => {} }>{text}</button>;
};
