import React from 'react';
import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import StoreProvider from '@/store/StoreProvider';
import StarBg from '@/svg/starBg.svg';

import '../globalStyles/globals.scss';

const josefinSans = Josefin_Sans({ subsets: [ 'latin' ], variable: '--font' });

export const metadata: Metadata = {
    title: 'cvevo',
    description: 'AI-powered CV enhancement tool',
};

export default async function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>cvevo</title>
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#141413" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#D9D9D9" />
            </head>

            <body className={ josefinSans.className }>
                <div className='bgAnimation'>
                    <StarBg viewBox="0 0 1115 1002"/>
                </div>
                <StoreProvider>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </StoreProvider>
            </body>
        </html>
    );
}
