import React from 'react';

import styles from './style.module.scss';

export default function Pricing() {
    return (
        <div className={ styles.pricing }>
            <div className={ styles.pricingWrapper }>
                <div className={ styles.heroBlock }>
                    <h1>Pricing (spoiler - it's free!)</h1>
                    <p>
                        At our service, we believe everyone should have access to top-notch career tools without breaking the bank.
                    </p>
                    <p>
                      That’s why our core service is completely free!
                    </p>
                </div>
                <div className={ styles.featuresBlock }>
                    <h2>Extra Features</h2>
                    <p>
                        Unlock additional features by watching short ads while your CV is being analyzed.
                    </p>
                    <br/>
                    <p>These features includes:</p>
                    <p>1. Cover letter</p>
                    <p>2. Extra interview questions</p>
                    <p>3. Interview questions answers</p>
                    <br/>
                    <p>
                      This way, we can keep offering you valuable insights at no cost, with the option to enhance your
                      experience easily :)
                    </p>
                </div>
            </div>
        </div>
    );
}
