import React from 'react';

import { ContentSection } from '@/components/UI';

import styles from './style.module.scss';

export default function Pricing() {
    return (
        <div className={ styles.pricing }>
            <div className={ styles.pricingWrapper }>
                <div className={ styles.heroBlock }>
                    <h1>Pricing (spoiler - it's free!)</h1>
                    <p>
                        At our service, we believe everyone should have access to top-notch career tools without breaking the bank.
                    </p>
                </div>
                <div className={ styles.plans }>
                    <div className={ styles.plansDescription }>
                        <h2>Plans</h2>
                        <p>
                            By watching short ads while your CV is being analyzed, you can gain valuable insights at no cost and have the option to enhance your experience.
                        </p>
                    </div>
                    <div className={ styles.plansBlock }>
                        <ContentSection>
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
                        <ContentSection>
                            <h2>Pro HR (Soon - for HR)</h2>
                            <p>
                                Revolutionize your hiring process with HRAI, the cutting-edge AI-powered service designed to streamline and enhance candidate screening.
                                <br/>
                                <br/>
                                HRAI leverages advanced artificial intelligence to automatically analyze resumes, cover letters, and job descriptions, providing you with valuable insights and recommendations to identify the best candidates quickly and efficiently
                            </p>
                        </ContentSection>
                    </div>
                </div>
            </div>
        </div>
    );
}
