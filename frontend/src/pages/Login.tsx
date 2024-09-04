import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../components/login-form/LoginForm';

const LoginPage = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#101010' }} fluid>
            <div className="p-4 login-container">
                <h3 className="text-center text-white mb-4">LOGIN</h3>
                <LoginForm/>
            </div>
        </Container>
    );
};

export default LoginPage;
