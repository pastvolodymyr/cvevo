import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';

export const Icon = ({ icon }: {icon: string}) => {
    return <FontAwesomeIcon icon={ fas[`fa${icon}`] } />
}
