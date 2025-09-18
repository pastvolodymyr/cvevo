import React from 'react';
import styles from './style.module.scss';
import { LinkButton } from '@/components/UI';

export default function Privacy() {
    return (
        <>
            <header className={ styles.heroBlock }>
                <h1>Privacy Policy</h1>
                <p>
                    Effective Date: 17.04.2025
                </p>
            </header>
            <article className={ styles.privacyContent }>
                <h2>1. Introduction</h2>
                <p>
                    Welcome to cvevo!
                    <br/> <br/>
                    We are committed to protecting your personal information and your right to
                    privacy. <br/><br/>If you have any questions or concerns about this privacy policy or our practices regarding
                    your personal information, please contact us at <LinkButton text={ 'cvevo@gmail.com' } href={ 'mailto:cvevo@gmail.com' }/>.
                </p>
                <h2>2. Information We Collect</h2>
                <p>
                    We collect personal information that you voluntarily provide to us when you register on the site,
                    express an interest in obtaining information about us or our products and services, participate
                    in activities on the site, or otherwise contact us.
                </p>
                <h2>2.1. Information Provided by You</h2>
                <p>
                    When you log in through your Google account, we collect and store your
                    email address and name in our database.
                </p>
                <h2>2.2. Automatically Collected Information</h2>
                <p>
                    Usage Data: We use Google Analytics to collect information about your use of the site, such as
                    the pages you visit, the time spent on those pages, and other related data.
                    <br/>  <br/>
                    Advertising Data: Our site displays some ads, and we may collect information about your interactions
                    with these ads.
                </p>
                <h2>3. How We Use Your Information</h2>
                <p>
                    Provide and manage the services you request.
                    Communicate with you regarding updates, services, and promotional offers.
                    Improve our website, services, and advertising efforts.
                </p>
                <h2>4. Sharing Your Information</h2>
                <p>
                    We do not share your personal information with third parties except in the following situations:
                    <br/> <br/>
                    Service Providers: We may share your information with third-party vendors, service providers,
                    contractors, or agents who perform services for us or on our behalf.
                    <br/>
                    Legal Obligations: We may disclose your information where we are legally required to do so to comply
                    with applicable laws, governmental requests, a judicial proceeding, court order, or legal process.
                </p>
                <h2>5. Security of Your Information</h2>
                <p>
                    We use administrative, technical, and physical security measures to protect your personal
                    information.<br/><br/> However, no method of transmission over the Internet or method of electronic
                    storage is 100% secure, and we cannot guarantee its absolute security.
                </p>
                <h2>6. Your Privacy Rights</h2>
                <p>
                    Depending on your location, you may have the following rights regarding your personal information:
                    <br/><br/>
                    Access and obtain a copy of your personal data.<br/>
                    Rectification of inaccurate or incomplete data.<br/>
                    Erasure of your personal data.<br/>
                    Restrict or object to the processing of your data.<br/>
                    Data portability.<br/><br/>
                    To exercise any of these rights, please contact us at <LinkButton text={ 'cvevo@gmail.com' } href={ 'mailto:cvevo@gmail.com' }/>.
                </p>
                <h2>7. Updates to This Privacy Policy</h2>
                <p>
                    We may update this privacy policy from time to time in order to reflect, for example, changes
                    to our practices or for other operational, legal, or regulatory reasons. We will notify you of any
                    changes by posting the new privacy policy on this page.
                </p>
                <h2 id='contact'>8. Contact Us</h2>
                <p>
                    If you have any questions or concerns about this privacy policy, please contact us at:
                    <br/><br/>
                    Email: <LinkButton text={ 'cvevo@gmail.com' } href={ 'mailto:cvevo@gmail.com' }/>
                </p>
            </article>
        </>
    )
}
