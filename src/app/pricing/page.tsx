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
                            Unlock additional features by watching short ads while your CV is being analyzed.
                            <br/>
                            <br/>
                            This way, we can keep offering you valuable insights at no cost, with the option to enhance your experience.
                        </p>
                    </div>
                    <div className={ styles.plansBlock }>
                        <ContentSection>
                            <h2>Free</h2>
                            <p>
                                1. Analyse your CV - receive tailored advice on how to optimize your CV, from formatting tips to content suggestions
                                <br/>
                                <br/>
                                2. Interview questions - research 5 potential interview questions you might encounter and prepare to your next interview
                            </p>
                        </ContentSection>
                        <ContentSection>
                            <h2>Extra (Also free, but with ads)</h2>
                            <p>
                                1. Interview questions - research 15 potential interview questions you might encounter and prepare to your next interview.
                                <br/>
                                <br/>
                                2. Cover letter - increase your chances of landing your dream job with a CV that highlights your strengths and aligns with industry standards.
                            </p>
                        </ContentSection>
                    </div>
                </div>
            </div>
        </div>
    );
}
