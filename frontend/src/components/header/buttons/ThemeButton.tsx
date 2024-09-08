import React from 'react';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../../features/theme/themeSlice';
import HeaderButton from './HeaderButton';

const ThemeButton = () => {
    const dispatch = useDispatch();

    return (
        <HeaderButton
            onClick={() => dispatch(changeTheme())}
            iconLight="bi-sun-fill"
            iconDark="bi-moon"
            title="Theme ändern"
            style={{ marginRight: '10px' }}
        />
    );
};

export default ThemeButton;
