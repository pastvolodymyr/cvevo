"use client"
import React, { useRef, useState } from 'react';
import cx from 'classnames'

import { Button, ContentSection, Loader } from '@/components/UI';
import { Captcha } from '@/components/Captcha';
import CvIcon from '@/svg/cv_analyse.svg'

import styles from './style.module.scss';

// const fakeAi = [
//     {
//         "label": "Unclear work history",
//         "text": "The employment history section could be better organized to highlight key roles, responsibilities, and achievements. Consider using a reverse chronological format and providing more details on your work experience and skills developed in each position.",
//     },
//     {
//         "label": "Lack of relevant skills",
//         "text": "The skills section is quite broad and could be tailored to showcase the technical and programming skills most relevant to the frontend developer role you are seeking. Consider grouping skills into categories and prioritizing those most pertinent to the job.",
//     },
//     {
//         "label": "Unstructured layout",
//         "text": "The overall layout could be made more visually appealing and easier to scan. Consider using consistent formatting, clear section headings, and proper spacing to make the resume more organized and professional-looking.",
//     },
//     {
//         "label": "Limited project details",
//         "text": "Adding a projects section with brief descriptions of your work on relevant frontend development initiatives could help demonstrate your practical experience and showcase your skills in action.",
//     },
// ]

export const CvAnalyser = () => {
    const [ isVerify, setIsVerify ] = useState(false);
    const [ error, setError ] = useState('');
    const [ fileData, setFileData ] = useState<File>();
    const [ fileLoading, setFileLoading ] = useState(false);
    const [ cvImprovements, setCvImprovements ] = useState<{label: string, text: string}[]>([])

    const uploadRef = useRef<HTMLInputElement>(null);
    const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileLoading(true)
        setError('')

        const file = event.target.files?.[0];
        const formData = new FormData()

        // @ts-ignore
        formData.append("image", file)

        fetch(`/api/analyse`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if(res.data && !res.error) {
                    setCvImprovements(res.data);
                    setFileData(file);
                }
                if(res.error) {
                    setError(res.error);
                }

                setFileLoading(false);
            })
    };

    const openUploadWindow = () => uploadRef.current?.click();
    const UploadFileInvisible = () => <input
        ref={ uploadRef }
        type="file"
        className={ styles.uploadFileField }
        onChange={ onUploadFile }
    />;

    return (
        <div className={ styles.cvAnalyser }>
            <UploadFileInvisible />
            <div className={ cx(styles.stepBlock, { [styles.stepBlockActive]: !cvImprovements?.length }) }>
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
                                        { error && <span> ({error})</span> }
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
                && <ContentSection className={styles.stepOneSection}>
                    <h2><CvIcon viewBox="0 0 17 21"/>CV improvements</h2>
                    <div className={styles.stepOneSectionResults}>
                        {
                            cvImprovements?.map((improve, index) => (
                                <div key={ index } className={styles.stepOneSectionResult}>
                                    <h2>{ improve.label }</h2>
                                    <p>{ improve.text }</p>
                                </div>
                            ))
                        }
                    </div>
                </ContentSection>
            }
            <div className={ cx(styles.stepBlock, { [styles.stepBlockActive]: cvImprovements.length }) }>
                <h2>Step Two (Soon)</h2>
                <p>
                    Add your dream job details
                </p>
            </div>
        </div>
    )
}
