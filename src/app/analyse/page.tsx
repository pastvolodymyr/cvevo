"use client"
import React from 'react';
import { useSelector } from 'react-redux';

import { CvAnalyser } from '@/components/CvAnalyser';
import { Ads } from '@/components/Ads';
import { LinkButton, Loader } from '@/components/UI';
import { userSelector } from '@/store/selectors/user.selector';

import styles from './style.module.scss';

export default function Analyse() {
    const { loading, data } = useSelector(userSelector);

    const tokens = loading || !data
        ? <span style={{ display: 'inline-block' }}><Loader /></span>
        : <>
            {data?.isFree ? 1 : data?.tokens} {data?.isFree ? 'Free' : ''}
        </>

    return (
        <>
            <header className={ styles.heroBlock }>
                <h1>CV analyser</h1>
                <p>
                    Obtain actionable suggestions, tailored cover letters, and targeted interview questions to enhance your job search
                </p>
                <h2>You have {tokens} token (<LinkButton href={ '/pricing' } text={ 'Get more tokens' }/>)</h2>
            </header>
            <CvAnalyser />
            <Ads />
        </>
    );
}
