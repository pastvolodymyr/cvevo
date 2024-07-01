"use client"
import React, { useRef, useState } from 'react';
import cx from 'classnames'

import { Button, ContentSection, Loader } from '@/components/UI';
import { Captcha } from '@/components/Captcha';

import styles from './style.module.scss';

function convertStringToArray(input: string) {
    const arrayWithData = input
        .split('\n')
        .filter(text => text)
        .map(text => text.replace(/\\/g, ''))
        .map(text => text.replace(/#/g, '').trim());

    return Array.from({ length: arrayWithData.length/2 }).map((_, index) => {
        const currentIndex = index * 2;

        return {
            label: arrayWithData[currentIndex],
            text: arrayWithData[currentIndex + 1],
        }
    })
}

export const CvAnalyser = () => {
    const [ isVerify, setIsVerify ] = useState(false);
    const [ isError, setIsError ] = useState('');

    const [ fileData, setFileData ] = useState<File>();
    const [ fileLoading, setFileLoading ] = useState(false);

    const [ cvImprove, setCvImprove ] = useState<{label: string, text: string}[]>([])
    const isStepOne = !fileData?.name

    const uploadRef = useRef<HTMLInputElement>(null);
    const openUploadWindow = () => uploadRef.current?.click();
    const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const formData = new FormData()

        setFileLoading(true)
        setIsError('')

        // @ts-ignore
        formData.append("image", file)

        fetch(`/api/analyse`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if(res.data && res.data !== 'null') {
                    setCvImprove(convertStringToArray(res.data));
                    setFileData(file);
                }
                if(res.error) {
                    setIsError(res.error);
                }
                if (res.data == 'null') {
                    setIsError("Sorry, our AI thinks there is no CV");
                }
                setFileLoading(false);
            })
    };

    const UploadFileInvisible = () => <input
        ref={ uploadRef }
        type="file"
        className={ styles.uploadFileField }
        onChange={ onUploadFile }
    />;

    return (
        <div className={ styles.cvAnalyser }>
            <UploadFileInvisible />
            <div className={ cx(styles.stepBlock, { [styles.stepBlockActive]: isStepOne }) }>
                <h2>Step One</h2>
                {
                    isVerify
                        ? <>
                            <p>
                            Upload your CV in PDF or PNG/JPEG format
                            </p>
                            {
                                fileLoading
                                    ? <div className={ styles.loaderWrapper }>
                                        <Loader />
                                    </div>
                                    : <div>
                                        <Button
                                            disabled={ !isVerify }
                                            text={ fileData?.name || 'File upload' }
                                            onClick={ openUploadWindow }
                                        />
                                        { isError && <span> ({isError})</span> }
                                    </div>
                            }
                        </>
                        : <div className={ styles.captchaWrapper }>
                            <Captcha onVerify={ () => setIsVerify(true) }/>
                        </div>
                }
            </div>
            {
                fileData?.type
                && !fileLoading
                && <>
                    <ContentSection>
                        <h2>CV improvements</h2>
                        <br/>
                        <br/>
                        {
                            cvImprove?.map(improve => (
                                <>
                                    <div>
                                        <h2>{improve.label}</h2>
                                        <br/>
                                        <p>{improve.text}</p>
                                    </div>
                                    <br/>
                                    <br/>
                                </>
                            ))
                        }
                    </ContentSection>
                    <br/>
                    <br/>
                </>
            }
            <div className={ cx(styles.stepBlock, { [styles.stepBlockActive]: !isStepOne }) }>
                <h2>Step Two (Soon)</h2>
                <p>
                    Add your dream job details
                </p>
            </div>
        </div>
    )
}
