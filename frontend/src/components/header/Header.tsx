import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

import { Paths } from '../../paths';
import Logo from '../../img/dataciders_quinscape_white.png'
import './header.css'

const Header = () => {
    const location = useLocation();

    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{ color: '#e5e5e1' }} >
            <Container>
                <Navbar.Brand href={Paths.home} style={{ marginRight: '30px' }}>
                    <Image src={Logo} style={{ width: '100px', height: 'auto' }} />
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
                <Button variant="outline-light" className='login-button'>
                    <i className="bi bi-box-arrow-in-right"> </i>
                    Login
                </Button>{' '}
            </Container>
        </Navbar>
    )
}

export default Header