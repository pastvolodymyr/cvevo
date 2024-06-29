"use client"
import React, { useEffect, useState } from 'react';

export const Ads = () => {
    const [ showAd, setShowAdd ] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowAdd(true)
        }, 3000)
    }, [])

    return (
        showAd && <iframe src="https://www.highrevenuenetwork.com/gdq500icu?key=0ebee665a703f450a89f215a8aaf631e" />
    )
}
