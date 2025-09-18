import React, { ReactElement } from 'react';
import cx from 'classnames';

import styles from './style.module.scss';
import { Icon, Loader } from '@/components/UI';

export const Button = ({ text, onClick, disabled, loading, className, icon }: { text: string | ReactElement, onClick?: () => void, disabled?: boolean, loading?: boolean, className?: string, icon?: string }) => {
    return <button className={ cx(styles.button, className, { [styles.buttonDisabled]: disabled, [styles.buttonLoading]: loading }) } onClick={ !disabled ? onClick : () => {} }>
        {icon && <Icon icon={ icon }/>}
        {loading && <div className={ styles.loaderWrapper }><Loader color={ '#fff' }/></div>}
        <span>{text}</span>
    </button>;
};
