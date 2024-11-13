import React from 'react';
import { useMsal } from "@azure/msal-react";

import HeaderButton from './HeaderButton';
import { defaultFilterState } from '../../../features/activeFilters/activeFiltersSlice';
import { Paths } from '../../../constants/paths';

const LogoutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        localStorage.setItem('filters', JSON.stringify(defaultFilterState));
        
        instance.logoutRedirect({
            postLogoutRedirectUri: Paths.profile,
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