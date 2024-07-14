import React from 'react';

import styles from './style.module.scss';

export const Loader = ({ color }: {color?: string}) => {
    return (
        <div className={ styles.loader } style={ color ? {
            background: `no-repeat linear-gradient(${color} 0 0), no-repeat linear-gradient(${color} 0 0), no-repeat linear-gradient(${color} 0 0), no-repeat linear-gradient(${color} 0 0)`,
            backgroundSize: '26% 3px',
        } : {} }/>
    );
};
