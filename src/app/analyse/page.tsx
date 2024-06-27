import React from 'react';

import { Loader } from '@/components/UI';

import styles from './style.module.scss';

export default function Analyse() {
    return (
        <div className={ styles.analyse }>
            <div className={ styles.analyseWrapper }>
                <div className={ styles.heroBlock }>
                    <h1>CV analyser</h1>
                    <p>
                        Get personalized feedback to refine your resume and catch employers' attention.
                    </p>
                </div>
                <Loader />
            </div>
        </div>
    );
}
