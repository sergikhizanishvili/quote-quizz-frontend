import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuth } from '../hooks/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {

    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please, enter credentials!');
            return;
        }

        setLoading(true);
        const authorize = await login({ email, password });
        setLoading(false);

        if (!authorize) {
            setErrorMessage('Incorrect credentials');
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={6} xl={4} className="min-vh-100 d-flex align-items-center mx-auto">
                    <Form onSubmit={handleSubmit} className="w-100">
                        <h1 className="mb-5">
                            Admin Login
                        </h1>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control ref={emailRef} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin me-3" /> : ''}
                            Login
                            </Button>

                        {errorMessage ?
                            <p ref={errorRef} className="text-danger py-3">{errorMessage}</p>
                            : ''
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;