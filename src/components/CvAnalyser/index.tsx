import React, { useRef, useState } from 'react';
import cx from 'classnames';

import { Button, Input } from '@/components/UI';
import { validateFile } from '@/utils/helpers';

import { StepTwo } from './StepTwo';
import { Result } from './Result';

import styles from './style.module.scss';

export const CvAnalyser = () => {
    const [ error, setError ] = useState(null);
    const [ stepNumber, setStepNumber ] = useState(1);
    const [ fade, setFade ] = useState(false);
    const [ analyseLoading, setAnalyseLoading ] = useState(false);
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

    const onAnalyse = (types: string[]) => {
        const formData = new FormData()

        // @ts-ignore
        formData.append("image", fieldsData.file);
        // @ts-ignore
        formData.append("jobTitle", fieldsData.jobTitle);
        // @ts-ignore
        formData.append("jobRequirements", fieldsData.jobRequirements);
        // @ts-ignore
        formData.append("types", types);

        setAnalyseLoading(true)

        fetch('/api/analyse', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                setAnalyseLoading(false)
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

                // console.log(res)

                // @ts-ignore
                if(res.error) {
                    // @ts-ignore
                    if(res.error.type === 'aiImage' || res.error.type === 'image') {
                        onChangeStep(1)
                        // @ts-ignore
                        setError(res.error.message);

                        return;
                    }

                    // @ts-ignore
                    setError(res.error?.message);

                    return
                }

                // @ts-ignore
                setAnalyseResult(res.data)
                onChangeStep(3)
            })
    }

    const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = event.target.files?.[0];
        const fileValid = validateFile( [
            'image/jpeg',
            'image/png',
            'application/pdf',
        ], 30 * 1024 * 1024, file)

        if(!fileValid.isValid) {
            // @ts-ignore
            setError(fileValid.message);

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
        setFade(true);

        setTimeout(() => {
            setFade(false);
            setStepNumber(step)
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
                <span className={ styles.error }>{ error && error }</span>
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

    const getStep = () => {
        switch (stepNumber) {
            case 1:
                return getStepOne();
            case 2:
                return <StepTwo onAnalyse={ onAnalyse } loading={ analyseLoading }/>
            case 3:
                // @ts-ignore
                return <Result onReset={ onReset } analyseResult={ analyseResult } onChangeStep={ onChangeStep }/>;

            default:
                return getStepOne();
        }
    }

    return (
        <article className={ cx( styles.cvAnalyser, { [styles.fade]: fade }) }>
            {
                getStep()
            }
        </article>
    )
}
