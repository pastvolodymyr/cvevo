import React from 'react';

import { LinkButton } from '@/components/UI';

import styles from './style.module.scss';

export default function Home() {
    return (
        <div className={ styles.home }>
            <div className={ styles.homeWrapper }>
                <div className={ styles.heroBlock }>
                    <h1>AI-powered CV enhancement tool</h1>
                    <p>
                        Whether you're a recent graduate, a seasoned professional,
                        or looking to pivot your career, cvevo is here to elevate your CV to the next level!
                    </p>
                    <LinkButton text={ 'Analyse your CV' } href={ '/analyse' }/>
                </div>
                <div className={ styles.faqBlock }>
                    <div className={ styles.faqSideBlock }>
                        <h2>Why cvevo?</h2>
                        <p>
                            Our advanced AI analyzes your CV in seconds, identifying key areas for improvement.
                        </p>
                        <p>
                            Receive tailored advice on how to optimize your CV, from formatting tips to content suggestions.
                        </p>
                        <p>
                            Increase your chances of landing your dream job with a CV that highlights your strengths and aligns with industry standards.
                        </p>
                    </div>
                    <div className={ styles.faqSideBlock }>
                        <h2>How It Works?</h2>
                        <p>
                            1. Simply upload your CV in PDF or PNG/JPEG format
                        </p>
                        <p>
                            2. Follow our easy-to-implement suggestions to improve your CV
                        </p>
                        <p>
                            3. Submit your polished CV with confidence and get noticed by top employers
                        </p>
                    </div>
                </div>
                <div className={ styles.featuresBlock }>
                    <h2>Features</h2>
                    <p>
                        NEW - Ensure your CV passes through Applicant Tracking Systems (ATS)
                    </p>
                    <p>
                        Correct errors and enhance readability
                    </p>
                    <p>
                        Make your CV visually appealing and easy to navigate
                    </p>
                    <p>
                        Tailor your CV to specific roles and industries for maximum impact
                    </p>
                </div>
            </div>
        </div>
    );
}
