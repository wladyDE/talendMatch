import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, changeTheme } from '../../../features/theme/themeSlice';

const ThemeButton = () => {
    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const iconColor = theme === 'light' ? (hovered ? 'white' : '#6c757d') : (hovered ? 'black' : '#f8f9fa');

    return (
        <Button
            onClick={() => dispatch(changeTheme())}
            variant={theme === 'light' ? 'outline-secondary' : 'outline-light'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <i
                className={`bi ${theme === 'light' ? 'bi-sun-fill' : 'bi-moon'}`}
                style={{ color: iconColor }} 
            ></i>
        </Button>
    );
};

export default ThemeButton;
