import React, { useState } from 'react';
import cx from 'classnames';

import { Button, ContentSection } from '@/components/UI';

import styles from './style.module.scss';

type ISelectFeature = {
    [key: string]: boolean,
}

export const StepTwo = ({
    onAnalyse,
    loading,
}: {
    onAnalyse: (types: string[]) => void,
    loading: boolean
}) => {
    const [ selectFeature, setSelectFeature ] = useState<ISelectFeature>({
        cv: false,
        coverLetter: false,
        interview: false,
    });

    const onChooseFeature = (feature: string) => {
        setSelectFeature({
            ...selectFeature,
            [feature]: !selectFeature[feature],
        })
    }

    const selectedFeatures = Object.keys(selectFeature).filter(featureKey => selectFeature[featureKey])
    const tokensCount = selectedFeatures?.length

    return (
        <section className={ cx(styles.stepBlock, styles.stepBlockTwo) }>
            <h2>Step Two</h2>
            <p>Select what you want to receive (each feature cost 1 token)</p>
            <section className={ styles.featureCards }>
                <ContentSection
                    className={ cx(styles.featureCard, { [styles.featureCardActive]: selectFeature?.cv }) }
                    as='section'
                    onClick={ () => onChooseFeature('cv') }
                >
                    <h2>CV improvements</h2>
                    <p>
                        Get personalized feedback to refine your resume and catch employers' attention
                    </p>
                </ContentSection>
                <ContentSection
                    className={ cx(styles.featureCard, { [styles.featureCardActive]: selectFeature.coverLetter }) }
                    as='section'
                    onClick={ () => onChooseFeature('coverLetter') }
                >
                    <h2>Cover letter</h2>
                    <p>
                        Create unique cover letter tailored to your strengths and job descriptions.
                    </p>
                </ContentSection>
                <ContentSection
                    className={ cx(styles.featureCard, { [styles.featureCardActive]: selectFeature.interview }) }
                    as='section'
                    onClick={ () => onChooseFeature('interview') }
                >
                    <h2>Interview questions</h2>
                    <p>
                        Receive tailored interview questions based on your CV and job description to help you prepare.
                    </p>
                </ContentSection>
            </section>
            <Button
                loading={ loading }
                disabled={ tokensCount < 1 }
                text={ `Analyse (${tokensCount} token${tokensCount > 1 || tokensCount == 0 ? 's' : ''})` }
                onClick={ () => tokensCount > 0 && onAnalyse(selectedFeatures) }
            />
        </section>
    )
}
