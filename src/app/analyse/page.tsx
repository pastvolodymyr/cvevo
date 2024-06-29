import React from 'react';

import { CvAnalyser } from '@/modules/CvAnalyser';

import styles from './style.module.scss';

export default function Analyse() {
    return (
        <div className={ styles.analyse }>
            <div className={ styles.analyseWrapper }>
                <div className={ styles.heroBlock }>
                    <h1>CV analyser</h1>
                    <p>
                        Obtain actionable suggestions, tailored cover letters, and targeted interview questions to enhance your job search
                    </p>
                </div>
                <CvAnalyser />
            </div>
        </div>
    );
}
