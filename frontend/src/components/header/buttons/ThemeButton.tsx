import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, selectTheme } from '../../../features/theme/themeSlice';
import HeaderButton from './HeaderButton';

const ThemeButton = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

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
