"use client"
import React, { useEffect, useState } from 'react';

export const Ads = () => {
    const [ showAd1, setShowAdd1 ] = useState(false);
    const [ showAd2, setShowAdd2 ] = useState(false);
    const [ showAd3, setShowAdd3 ] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowAdd1(true)
        }, 1000)
        setTimeout(() => {
            setShowAdd2(true)
        }, 2000)
        setTimeout(() => {
            setShowAdd3(true)
        }, 3000)
    }, [])

    return (
        <>
            {showAd1
                && <iframe src="https://www.highrevenuenetwork.com/gdq500icu?key=0ebee665a703f450a89f215a8aaf631e"/>}
            {showAd2
                && <iframe src="https://www.highrevenuenetwork.com/gdq500icu?key=0ebee665a703f450a89f215a8aaf631e"/>}
            {showAd3
                && <iframe src="https://www.highrevenuenetwork.com/gdq500icu?key=0ebee665a703f450a89f215a8aaf631e"/>}
        </>
    )
}
