import React from 'react';

import styles from './style.module.scss'

export const Input = ({ value, onChange, type = 'text', label, counter, rows = 5, placeholder }: { value?: string, onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void, type?: string, label: string, counter?: number, rows?: number, placeholder?: string }) => {
    return (
        <label className={ styles.inputWrapper }>
            <span className={ styles.label }>{label}</span>
            {
                type === 'textarea'
                    ? <textarea placeholder={ placeholder } rows={ rows } className={ styles.input } value={ value } onChange={ onChange } />
                    : <input placeholder={ placeholder } className={ styles.input } value={ value } onChange={ onChange } />
            }
            { counter && <span className={ styles.counter }>{value?.length || 0}/{counter}</span> }
        </label>
    )
}
