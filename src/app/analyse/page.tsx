import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect, RedirectType } from 'next/navigation';

import { CvAnalyser } from '@/modules/CvAnalyser';
import { Ads } from '@/components/Ads';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import styles from './style.module.scss';

export default async function Analyse() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/?login=true&page=analyse", RedirectType.push);
    }

    return (
        <div className={ styles.analyse }>
            <Ads />
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
