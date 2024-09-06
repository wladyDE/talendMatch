import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';

import { Paths } from '../../paths';
import DarkLogo from '../../img/dataciders_quinscape_white.png'
import LightLogo from '../../img/dataciders_quinscape_black.png'
import './header.css'
import ThemeButton from './themeButton/themeButton';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useSelector(selectTheme);

    return (
        <Navbar bg={theme} variant={theme} className={`${theme}-theme`}>
            <Container>
                <Navbar.Brand href={Paths.home} style={{ marginRight: '30px' }}>
                    <Image src={theme === 'dark' ? DarkLogo : LightLogo} className='logo-img' />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link
                        href={Paths.home}
                        className={location.pathname === Paths.home ? 'nav-link active' : 'nav-link'}
                    >
                        Profil
                    </Nav.Link>
                    <Nav.Link
                        href={Paths.search}
                        className={location.pathname === Paths.search ? 'nav-link active' : 'nav-link'}
                    >
                        Suchen
                    </Nav.Link>
                </Nav>
                <Button
                    onClick={() => navigate(Paths.login)}
                    variant="outline-light"
                    className='login-button'
                    style={{ marginRight: '10px' }}
                >
                    <i className="bi bi-box-arrow-in-right"> </i>
                    Login
                </Button>
                <ThemeButton/>

            </Container>
        </Navbar>
    );
}

export default Header