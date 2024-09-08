import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';

import { Paths } from '../../paths';
import LightLogo from '../../img/dataciders_quinscape_black.png'
import './header.css'

import { styles as currentStyles } from '../../styles/styles';
import AusloggenButton from './buttons/AusloggenButton';
import ThemeButton from './buttons/ThemeButton';

const Header = () => {
    const location = useLocation();
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme)

    return (
        <Navbar style={styles.navbar}>
            <Container>
                <Navbar.Brand href={Paths.home} style={{marginRight : '30px'}}>
                    <Image
                        src={LightLogo}
                        className='logo-img'
                    />
                </Navbar.Brand>

                <Nav className="me-auto">
                    <Nav.Link
                        href={Paths.home}
                        style={location.pathname === Paths.home ? styles.navLinkActive : styles.navLink}
                    >
                        Profil
                    </Nav.Link>
                    <Nav.Link
                        href={Paths.search}
                        style={location.pathname === Paths.search ? styles.navLinkActive : styles.navLink}
                        className='nav-link'>
                        Suchen
                    </Nav.Link>
                </Nav>

                <ThemeButton/>
                <AusloggenButton/>

            </Container>
        </Navbar>
    );
}

export default Header