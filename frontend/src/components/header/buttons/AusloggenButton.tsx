import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../paths';
import HeaderButton from './HeaderButton';


const AusloggenButton = () => {
    const navigate = useNavigate();

    return (
        <HeaderButton
            onClick={() => navigate(Paths.login)}
            iconLight="bi-box-arrow-in-left"
            iconDark="bi-box-arrow-in-left"
            title="Ausloggen"
        />
    );
};

export default AusloggenButton;