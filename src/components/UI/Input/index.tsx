import React from 'react';

import styles from 'style.module.scss'

export const Input = ({ value, onChange, type = 'text', label, counter }: { value: string, onChange: () => void, type: string, label: string, counter: number }) => {
    return (
        <label className={styles.inputWrapper}>
            <span>{label}</span>
            <input className={ styles.input } value={ value } onChange={ onChange } type={ type }/>
            { counter && <span>{counter}</span> }
        </label>
    )
}
