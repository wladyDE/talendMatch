import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';

import { Paths } from '../../constants/paths';
import LightLogo from '../../img/dataciders_quinscape_black.png';
import './header.css';

import { styles as currentStyles } from '../../styles/styles';
import LogoutButton from './buttons/LogoutButton';
import ThemeButton from './buttons/ThemeButton';

const Header = () => {
    const location = useLocation();
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme);

    return (
        <Navbar style={styles.navbar}>
            <Container>
                <Navbar.Brand as={Link} to={Paths.profile} style={{ marginRight: '30px' }}>
                    <Image
                        src={LightLogo}
                        className='logo-img'
                    />
                </Navbar.Brand>

                <Nav className="me-auto">
                    <Nav.Link
                        as={Link}
                        to={Paths.profile}
                        style={location.pathname === Paths.profile ? styles.navLinkActive : styles.navLink}
                    >
                        Profil
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to={Paths.search}
                        style={location.pathname === Paths.search ? styles.navLinkActive : styles.navLink}
                        className='nav-link'>
                        Suchen
                    </Nav.Link>
                </Nav>

                <ThemeButton />
                <LogoutButton />

            </Container>
        </Navbar>
    );
}

export default Header;
