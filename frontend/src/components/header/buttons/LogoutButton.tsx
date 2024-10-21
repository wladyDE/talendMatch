import React from 'react';
import { useMsal } from "@azure/msal-react";

import HeaderButton from './HeaderButton';
import { Paths } from '../../../constants/paths';


const LogoutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: Paths.home,
        });
    };

    return (
        <HeaderButton
            onClick={handleLogout}
            iconLight="bi-box-arrow-in-left"
            iconDark="bi-box-arrow-in-left"
            title="Ausloggen"
        />
    );
};

export default LogoutButton;