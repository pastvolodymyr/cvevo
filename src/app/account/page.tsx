"use client"
import React from 'react';
import { useSelector } from 'react-redux';

import { ContentSection } from '@/components/UI';
import { userSelector } from '@/store/selectors/user.selector';

import styles from './style.module.scss';

export default function Account() {
    const { data } = useSelector(userSelector);

    const userName = data
        && (
            data.name
                ? data.name.split(' ')[0]
                : data.email.split('@')[0]
        )

    return (
        <>
            <header className={ styles.heroBlock }>
                <h1>Hi there{ userName ? `, ${userName}` : '' }</h1>
                <p>
                    At our service, we believe everyone should have access to top-notch career tools without breaking the bank.
                </p>
            </header>
            <article className={ styles.plans }>
                <section className={ styles.plansBlock }>
                    <ContentSection className={ styles.planBlock } as={ 'section' }>
                        <h2>Free (For all)</h2>
                        <p>
                            1. CV improvements - get personalized feedback to refine your resume and catch employers' attention.
                            <br/>
                            <br/>
                            2. Cover Letter - create unique cover letter tailored to your strengths and job descriptions.
                            <br/>
                            <br/>
                            3. Interview questions - receive 10 tailored interview questions based on your CV and job description to help you prepare.
                        </p>
                    </ContentSection>
                    <ContentSection className={ styles.planBlock } as={ 'section' }>
                        <h2>Pro HR (Soon - for HR)</h2>
                        <p>
                            Revolutionize your hiring process with HRAI, the cutting-edge AI-powered service designed to streamline and enhance candidate screening.
                            <br/>
                            <br/>
                            HRAI leverages advanced artificial intelligence to automatically analyze resumes, cover
                            letters, and job descriptions, providing you with valuable insights and recommendations to identify the best candidates quickly and efficiently
                        </p>
                    </ContentSection>
                </section>
            </article>
        </>
    );
}
