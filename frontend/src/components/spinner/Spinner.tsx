import React from 'react'
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';


const Spinner = () => {
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme)

    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100" 
            style={theme === 'light' ? {} : styles.container}
        >
            <BootstrapSpinner animation="border" role="status" />
        </div>
    );
};

export default Spinner;

