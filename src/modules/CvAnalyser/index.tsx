"use client"
import React, { useRef, useState } from 'react';
import cx from 'classnames'
import Turnstile from "react-turnstile";

import { Button, ContentSection, Loader } from '@/components/UI';

import styles from './style.module.scss';
import { Ads } from '@/components/Ads';

export const CvAnalyser = () => {
    const [ isVerify, setIsVerify ] = useState(false);

    const [ fileData, setFileData ] = useState<File>();
    const [ fileLoading, setFileLoading ] = useState(false);
    const [ showAds, setShowAds ] = useState(false)
    const isStepOne = !fileData?.name

    const uploadRef = useRef<HTMLInputElement>(null);
    const openUploadWindow = () => uploadRef.current?.click();
    const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const formData = new FormData()

        setFileLoading(true)

        // @ts-ignore
        formData.append("image", file)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}&expiration=60`, {
            method: 'POST',
            body: formData,
        }).then(res => res.json()).then(() => {
            // const imageUrl = res.data.thumb.url;

            // console.log(imageUrl)

            setShowAds(true)
            setFileLoading(false);
            setFileData(file);
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
            {
                showAds && <Ads />
            }
            <UploadFileInvisible />
            <div className={ cx(styles.stepBlock, { [styles.stepBlockActive]: isStepOne }) }>
                <h2>Step One</h2>

                {
                    isVerify ? <>
                        <p>
                            Upload your CV in PDF or PNG/JPEG format
                        </p>
                        {
                            fileLoading
                                ? <div className={ styles.loaderWrapper }>
                                    <Loader />
                                </div>
                                : <Button disabled={ !isVerify } text={ fileData?.name || 'File upload' } onClick={ openUploadWindow }/>
                        }
                    </>
                        : <div className={ styles.captcha }>
                            <div className={styles.captchaLoader}>
                                <Loader />
                            </div>
                            <Turnstile
                                fixedSize
                                theme={ 'light' }
                                appearance={ 'always' }
                                execution={ 'render' }
                                // sitekey="0x4AAAAAAAeC5zDZbX2U4RHS"
                                sitekey={ '1x00000000000000000000AA' }
                                onVerify={ () => setIsVerify(true) }
                            />
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
                        <div>
                            <h2>Frontend Framework Expertise</h2>
                            <br/>
                            <p>Elaborate on your experience with React and Next.js. Include specific features you've
                                implemented or complex UI challenges you've solved using these frameworks</p>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <h2>Performance Optimization</h2>
                            <br/>
                            <p>Add details about any performance improvements you've achieved in web applications.
                                For example, mention techniques you've used for reducing load times or optimizing
                                React component rendering</p>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <h2>Browser Extension Development</h2>
                            <br/>
                            <p>Provide more details about the browser extensions you've developed. Mention specific
                                functionalities, challenges overcome, or any notable user adoption metrics</p>
                        </div>
                    </ContentSection>
                    <br/>
                    <br/>
                </>
            }
            <div className={ cx(styles.stepBlock, { [styles.stepBlockActive]: !isStepOne }) }>
                <h2>Step Two</h2>
                <p>
                    Add your dream job details
                </p>
            </div>
        </div>
    )
}
