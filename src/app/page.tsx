import React from 'react';
import Link from 'next/link';

import { Button, ContentSection } from '@/components/UI';
import CvAnalyseIcon from '@/svg/cv_analyse.svg';
import CoverIcon from '@/svg/cover.svg';
import QuestionIcon from '@/svg/question.svg';
import { Ads } from '@/components/Ads';

import styles from './style.module.scss';

export default function Home() {
    return (
        <>
            <header className={ styles.heroBlock }>
                <h1>AI-powered CV analysing tool</h1>
                <p>
                    Whether you're a recent graduate, a seasoned professional,
                    or looking to pivot your career, cvevo is here to elevate your career to the next level!
                </p>
                <Link prefetch={false} aria-label='Start analysing your CV' href={ '/analyse' }>
                    <Button text={ 'Analyse your CV' }/>
                </Link>
            </header>
            <article className={ styles.sections }>
                <ContentSection className={ styles.section } as={ 'section' }>
                    <section className={ styles.textContentPart }>
                        <h2>Features</h2>
                        <div className={ styles.descriptionContentPart }>
                            <p>
                                <span><CvAnalyseIcon viewBox="0 0 17 21"/>CV improvements </span>
                                — get personalized feedback to refine your resume and catch employers' attention.
                            </p>
                            <p>
                                <span><CoverIcon viewBox="0 0 20 20"/>Cover Letter </span>
                                — create unique cover letter tailored to your strengths and job descriptions.
                            </p>
                            <p>
                                <span><QuestionIcon viewBox="0 0 21 21"/>Interview questions </span>
                                — receive tailored interview questions based on your CV and job description to help you prepare.
                            </p>
                        </div>
                    </section>
                    <figure>
                        <img src='/images/demost.jpg' alt='Features demosntration' />
                    </figure>
                </ContentSection>
                <ContentSection className={ styles.section } as={ 'section' }>
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
                <ContentSection className={ styles.section } as={ 'section' }>
                    <h2>Why cvevo?</h2>
                    <p>
                            + Get advice and resources specifically tailored to your career background and aspirations.
                        <br/>
                        <br/>
                            + Our intuitive interface ensures you get the results you need quickly and effortlessly.
                        <br/>
                        <br/>
                            + Be well-prepared and self-assured with tools designed to help you succeed.
                    </p>
                </ContentSection>
            </article>
            <Ads />
        </>
    );
}
