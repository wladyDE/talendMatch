import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './loginForm.css';

const LoginForm = () => {
    return (
        <Form>
            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Email"
                    className="form-control-custom"
                />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    className="form-control-custom"
                />
            </Form.Group>

            <div className="text-center">
                <a href="#" className="forgot-password-link mb-3 d-block">Forgot password?</a>
                <Button
                    variant="outline-light"
                    type="submit"
                    className="login-button"
                >
                    LOGIN
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
