import React from 'react';
import Turnstile from 'react-turnstile';

import { Loader } from '@/components/UI';

import styles from './style.module.scss';

export const Captcha = ({ onVerify }: {onVerify: () => void}) => {
    const siteKey = process.env.NODE_ENV === 'development'
        ? '1x00000000000000000000AA'
        : (process.env.NEXT_PUBLIC_CAPTCHA_API || '2x00000000000000000000AB');

    return (
        <div className={ styles.captcha }>
            <div className={ styles.captchaLoader }>
                <Loader />
            </div>
            <Turnstile
                className={ styles.captchaWidget }
                fixedSize
                theme={ 'light' }
                appearance={ 'always' }
                execution={ 'render' }
                sitekey={ siteKey }
                onVerify={ onVerify }
            />
        </div>
    )
}
