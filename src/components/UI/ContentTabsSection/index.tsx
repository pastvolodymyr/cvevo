import React, { ElementType, useState } from 'react';
import cx from 'classnames';

import { Icon } from '@/components/UI';

import styles from './style.module.scss';

// eslint-disable-next-line max-len
export const ContentTabsSection = ({
    className,
    tabs,
    as: Tag = 'div',
}: {
    className?: string,
    as?: ElementType,
    tabs: {
        label: string,
        content: React.ReactNode,
        icon: string
    }[]
}) => {
    const [ currentTab, setCurrentTab ] = useState(0)

    return (
        <Tag className={ cx(styles.contentSection, className) }>
            <div className={ styles.contentTabs }>
                {
                    tabs.map((tab, index) => <button
                        key={ index }
                        onClick={ () => setCurrentTab(index) }
                        className={ cx({ [styles.activeTab]: currentTab === index }) }
                    >
                        {tab.icon && <Icon icon={ tab.icon } />}
                        <span>{tab.label}</span>
                    </button>)
                }
            </div>
            <div className={ styles.content }>
                {tabs[currentTab].content}
            </div>
        </Tag>
    );
};
