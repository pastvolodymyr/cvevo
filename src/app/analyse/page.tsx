import React from 'react';

import styles from './style.module.scss';

export default function Analyse() {
    return (
        <div className={ styles.analyse }>
            <div className={ styles.analyseWrapper }>
                <div className={ styles.heroBlock }>
                    <h1>CV analyser</h1>
                    <p>
                      Follow our easy-to-implement suggestions to improve your CV
                    </p>
                </div>
            </div>
        </div>
    );
}
