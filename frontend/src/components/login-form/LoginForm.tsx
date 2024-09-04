import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import './loginForm.css';

const LoginForm = () => {
    return (
        <Form>
            <Form.Group controlId="formEmail" className="mb-3 position-relative">
                <Form.Control
                    type="email"
                    placeholder="Email"
                    className="form-control-custom"
                />
                <div className="input-icon">
                    <AiOutlineMail />
                </div>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3 position-relative">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    className="form-control-custom"
                />
                <div className="input-icon">
                    <AiOutlineLock />
                </div>
            </Form.Group>

            <div className="text-center">
                <a href="#" className="forgot-password-link mb-3 d-block">Passwort vergessen?</a>
                <Button
                    variant="outline-light"
                    type="submit"
                    className="login-button"
                >
                    Anmelden
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
