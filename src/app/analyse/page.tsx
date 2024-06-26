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
                        Follow our easy-to-implement suggestions to improve your CV
                    </p>
                </div>
                <div className={ styles.stepBlock }>
                    <h2>Step One</h2>
                    <p>
                        Upload your CV in PDF or PNG/JPEG format
                    </p>
                    <Loader />
                </div>
                <div className={ styles.stepBlock }>
                    <h2>Step Two</h2>
                    <p>
                        Follow our easy-to-implement suggestions to improve your CV
                    </p>
                </div>
                <div className={ styles.stepBlock }>
                    <h2>Finish</h2>
                    <p>
                        Submit your polished CV with confidence and get noticed by top employers
                    </p>
                </div>
            </div>
        </div>
    );
}
