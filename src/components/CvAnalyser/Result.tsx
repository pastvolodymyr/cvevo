import React from 'react';
import cx from 'classnames';

import { Button, LinkButton } from '@/components/UI';
import { ContentTabsSection } from '@/components/UI/ContentTabsSection';

import styles from '@/components/CvAnalyser/style.module.scss';

export const Result = ({
    onReset,
    onChangeStep,
    analyseResult,
}: {
    onReset: () => void,
    onChangeStep: (step: number) => void,
    analyseResult: {
        cv: any,
        coverLetter: any,
        interview: any
    }
}) => {
    return (
        <section className={ cx(styles.stepBlock, styles.stepBlockThree) }>
            <h2>Finally!</h2>
            <p>Be well-prepared and self-assured with tools designed to help you succeed</p>
            <div className={ styles.stepBlockThreeControls } style={{ display: 'flex' }}>
                <Button icon={ 'RotateRight' } text={ 'Re-analyse' } onClick={ onReset }/>
                <Button icon={ 'FileArrowDown' } text={ 'PDF' } onClick={ () => onChangeStep(1) }/>
            </div>
            <br/>
            <ContentTabsSection as='section' tabs={ [
                {
                    label: 'CV Improvements',
                    icon: 'ClipboardList',
                    content: (
                        <section className={ styles.cvImprovements }>
                            {
                                // @ts-ignore
                                analyseResult?.cv.map(({ label, text }, index) => (
                                    <div key={ index } className={ styles.cvImprovement }>
                                        <h2>{label}</h2>
                                        <p>{text}</p>
                                    </div>
                                ))
                            }
                        </section>
                    ),
                },
                {
                    icon: 'EnvelopeOpenText',
                    label: 'Cover letter',
                    content: (
                        <section className={ styles.coverLetter }>
                            <p>
                                {analyseResult?.coverLetter[0].coverLetter || analyseResult?.coverLetter}
                            </p>
                        </section>
                    ),
                },
                {
                    icon: 'CircleQuestion',
                    label: 'Interview questions',
                    content: (
                        <section className={ styles.interviews }>
                            {
                                // @ts-ignore
                                analyseResult?.interview.map(({ question, answer, recapLink }, index) => (
                                    <div key={ index } className={ styles.interview }>
                                        <h2>{question}</h2>
                                        <p>{answer}</p>
                                        <LinkButton aria-label={ `Recap - ${answer}` } href={ recapLink } text={ 'Recap Link' }/>
                                    </div>
                                ))
                            }
                        </section>
                    ),
                },
            ] }/>
        </section>
    )
}
