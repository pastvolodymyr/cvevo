import React, { useRef, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';

import { Button, ContentSection, Input } from '@/components/UI';
import { ContentTabsSection } from '@/components/UI/ContentTabsSection';
import { validateFile } from '@/utils/helpers';

import styles from './style.module.scss';
// import { updateUserData } from '@/store/slices/user.slice';

export const CvAnalyser = () => {
    const [ stepNumber, setStepNumber ] = useState(1);
    const [ awaitStepNumber, setAwaitStepNumber ] = useState(1);
    const [ analyseResult, setAnalyseResult ] = useState(null);
    const [ fieldsData, setFieldsData ] = useState<{
        file?: File,
        jobTitle?: string,
        jobRequirements?: string,
    }>({})

    const uploadRef = useRef<HTMLInputElement>(null);

    const onChangeField = (type: string, data: string | any) => {
        setFieldsData({
            ...fieldsData,
            [type]: data,
        })
    }

    const onReset = () => {
        setFieldsData({});
        onChangeStep(1);
    }

    const onAnalyse = () => {
        const formData = new FormData()

        // @ts-ignore
        formData.append("image", fieldsData.file);
        // @ts-ignore
        formData.append("jobTitle", fieldsData.jobTitle);
        // @ts-ignore
        formData.append("jobRequirements", fieldsData.jobRequirements);

        fetch('/api/analyse', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {

                // if(res.data && res.user && !res.error) {
                //     // @ts-ignore
                //     setCvImprovements(res.data);
                //     // @ts-ignore
                //     dispatch(updateUserData(res.user))
                // }
                // // @ts-ignore
                // if(res.error) {
                //     // @ts-ignore
                //     setError(res.error);
                // }

                // @ts-ignore
                setAnalyseResult(res)
                onChangeStep(3)
            })
    }

    const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const fileValid = validateFile( [
            'image/jpeg',
            'image/png',
            'application/pdf',
        ], 30 * 1024 * 1024, file)

        if(!fileValid.isValid) {
            // setError(fileValid.message);

            return
        }

        onChangeField('file', file);
    };
    const openUploadWindow = () => uploadRef.current?.click();
    const UploadFileInvisible = () => <input
        ref={ uploadRef }
        type="file"
        className={ styles.uploadFileField }
        onChange={ onUploadFile }
    />;

    const onChangeStep = (step: number) => {
        setStepNumber(step);

        setTimeout(() => {
            setAwaitStepNumber(step)
        }, 300)
    }

    const getStepOne = () => (
        <section className={ cx(styles.stepBlock, styles.stepBlockOne, { [styles.stepBlockFade]: stepNumber !== 1 }) }>
            <UploadFileInvisible />
            <h2>Step One</h2>
            <p>Upload your CV and provide your dream job short description</p>
            <div className={ styles.stepBlockTwoForm }>
                <Button
                    text={ fieldsData?.file?.name || 'Select CV file' }
                    className={ styles.stepBlockTwoFileUpload }
                    onClick={ openUploadWindow }
                />
                <Input
                    value={ fieldsData.jobTitle }
                    placeholder={ 'Front end developer' }
                    onChange={ e => {
                        onChangeField('jobTitle', e.target.value)
                    } }
                    label={ "Job title" }
                    counter={ 50 }
                />
                <Input
                    value={ fieldsData.jobRequirements }
                    placeholder={ '4 years in development, React, Next' }
                    onChange={ e => {
                        onChangeField('jobRequirements', e.target.value)
                    } }
                    label={ "Job requirements" }
                    type={ 'textarea' }
                    counter={ 50 }
                />

                <Button
                    disabled={ !fieldsData.jobTitle || !fieldsData.jobRequirements || !fieldsData.file }
                    className={ styles.stepBlockTwoSubmit }
                    text={ 'Save details' }
                    onClick={ () => onChangeStep(2) }
                />
            </div>
        </section>
    )

    const getStepTwo = () => (
        <section className={ cx(styles.stepBlock, styles.stepBlockTwo, { [styles.stepBlockFade]: stepNumber !== 2 }) }>
            <h2>Step Two</h2>
            <p>Select what you want to receive (each feature cost 1 token)</p>
            <section className={ styles.featureCards }>
                <ContentSection className={ styles.featureCard } as='section'>
                    <h2>CV improvements</h2>
                    <p>
                        Get personalized feedback to refine your resume and catch employers' attention
                    </p>
                </ContentSection>
                <ContentSection className={ styles.featureCard } as='section'>
                    <h2>Cover letter</h2>
                    <p>
                        Create unique cover letter tailored to your strengths and job descriptions.
                    </p>
                </ContentSection>
                <ContentSection className={ styles.featureCard } as='section'>
                    <h2>Interview questions</h2>
                    <p>
                        Receive tailored interview questions based on your CV and job description to help you prepare.
                    </p>
                </ContentSection>
            </section>
            <Button text={ 'Analyse (2 tokens)' } onClick={ () => onAnalyse() }/>
        </section>
    )

    const getResult = () => (
        <section className={ cx(styles.stepBlock, styles.stepBlockThree, { [styles.stepBlockFade]: stepNumber !== 3 }) }>
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
                                analyseResult?.data?.cv.map(({ label, text }, index) => (
                                    <div key={ index }>
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
                                {/*@ts-ignore*/}
                                {analyseResult?.data?.coverLetter[0].coverLetter}
                            </p>
                        </section>
                    ),
                },
                {
                    icon: 'CircleQuestion',
                    label: 'Interview questions',
                    content: (
                        <section className={ styles.cvImprovements }>
                            {
                                // @ts-ignore
                                analyseResult?.data?.interview.map(({ question, answer, recapLink }, index) => (
                                    <div key={ index }>
                                        <h2>{question}</h2>
                                        <p>{answer}</p>
                                        <Link aria-label={ `Recap - ${answer}` } href={ recapLink }>Recap Link</Link>
                                    </div>
                                ))
                            }
                        </section>
                    ),
                },
            ] }/>
        </section>
    )

    const getStep = () => {
        switch (awaitStepNumber) {
            case 1:
                return getStepOne();
            case 2:
                return getStepTwo();
            case 3:
                return getResult();

            default:
                return getStepOne();
        }
    }

    return (
        <article className={ styles.cvAnalyser }>
            {
                getStep()
            }
        </article>
    )
}
