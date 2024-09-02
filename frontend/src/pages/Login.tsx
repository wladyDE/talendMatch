import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../components/login-form/LoginForm';

const LoginPage = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#1a1a1a' }} fluid>
            <div className="p-4" style={{ width: '300px', backgroundColor: '#2d2d2d', borderRadius: '10px' }}>
                <h2 className="text-center text-white mb-4">LOGIN</h2>
                <LoginForm/>
            </div>
        </Container>
    );
};

export default LoginPage;
