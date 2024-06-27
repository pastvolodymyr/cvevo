import React from 'react';

import { ContentSection, LinkButton } from '@/components/UI';

import styles from './style.module.scss';

export default function Home() {
    return (
        <div className={ styles.home }>
            <div className={ styles.homeWrapper }>
                <div className={ styles.heroBlock }>
                    <h1>AI-powered CV analysing tool</h1>
                    <p>
                        Whether you're a recent graduate, a seasoned professional,
                        or looking to pivot your career, cvevo is here to elevate your career to the next level!
                    </p>
                    <LinkButton text={ 'Analyse your CV' } href={ '/analyse' }/>
                </div>
                <div className={ styles.sections }>
                    <ContentSection>
                        <h2>Features</h2>
                        <p>
                            CV analyser - get personalized feedback to refine your resume and catch employers' attention.
                            <br/>
                            <br/>
                            Cover Letters - create unique cover letters tailored to your strengths and job descriptions.
                            <br/>
                            <br/>
                            Interview questions - receive tailored interview questions based on your CV and job description to help you prepare.
                        </p>
                        <img src='/images/demonstrate.gif' alt='' />
                    </ContentSection>
                    <ContentSection>
                        <h2>How it works?</h2>
                        <p>
                            1. Start by uploading your CV for a thorough analysis and personalized feedback
                            <br/>
                            <br/>
                            2. Provide a short job description to receive customized cover letters and interview questions
                            <br/>
                            <br/>
                            3. Obtain actionable suggestions, tailored cover letters, and targeted interview questions to enhance your job search
                        </p>
                    </ContentSection>
                    <ContentSection>
                        <h2>Why cvevo?</h2>
                        <p>
                            Get advice and resources specifically tailored to your career background and aspirations.
                            <br/>
                            <br/>
                            Our intuitive interface ensures you get the results you need quickly and effortlessly.
                            <br/>
                            <br/>
                            Be well-prepared and self-assured with tools designed to help you succeed.
                        </p>
                    </ContentSection>
                </div>
            </div>
        </div>
    );
}
