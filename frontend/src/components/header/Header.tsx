import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

import { Paths } from '../../paths';
import Logo from '../../img/dataciders_quinscape_white.png'

const Header = () => {
    const location = useLocation();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href={Paths.home} style={{ marginRight: '30px' }}>
                    <Image src={Logo} style={{ width: '100px', height: 'auto' }} />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link
                        href={Paths.home}
                        style={{ color: location.pathname === Paths.home ? 'white' : 'gray' }}
                    >
                        Profil
                    </Nav.Link>
                    <Nav.Link
                        href={Paths.search}
                        style={{ color: location.pathname === Paths.search ? 'white' : 'gray' }}
                    >
                        Suche
                    </Nav.Link>
                </Nav>
                <Button variant="outline-light">
                    <i className="bi bi-box-arrow-in-right"> </i>
                    Login
                </Button>{' '}
            </Container>
        </Navbar>
    )
}

export default Header