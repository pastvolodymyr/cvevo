import React from 'react';

import { Button, ContentSection } from '@/components/UI';
import { Ads } from '@/components/Ads';

import styles from './style.module.scss';

export default function Pricing() {
    return (
        <>
            <header className={ styles.heroBlock }>
                <h1>Pricing</h1>
                <p>
                    Take the first step towards your dream job by choosing a token pack that suits your needs.
                </p>
            </header>
            <article className={ styles.plans }>
                <section className={ styles.plansDescription }>
                    <h2>Tokens Packs</h2>
                    <p>
                        Purchase tokens and use them for a range of comprehensive career support services,
                        including CV improvements, personalized cover letter writing, and customized interview
                        questions.
                    </p>
                </section>
                <section className={ styles.plansBlock }>
                    <ContentSection className={ styles.planBlock } as={ 'section' }>
                        <h2>$2.95 <span>— Regular Pack</span></h2>
                        <h3>5 Tokens</h3>
                        <br/>
                        <p className={ styles.planDescription }>+ CV improvements<br/>+ Cover letter<br/>+ Interview questions</p>
                        <p className={ styles.planSuggestion }>Perfect for trying out all our services</p>
                        <Button text={ 'Buy Pack' } />
                    </ContentSection>
                    <ContentSection className={ styles.planBlock } as={ 'section' }>
                        <h2>$0.00 <span>— Free</span></h2>
                        <h3>1 Free Token</h3>
                        <br/>
                        <p className={ styles.planDescription }>+ CV improvements</p>
                        <p className={ styles.planSuggestion }>Try our CV improvements for free</p>
                        <Button text={ 'Analyse CV' } />
                    </ContentSection>
                </section>
            </article>
            <Ads />
        </>
    );
}
