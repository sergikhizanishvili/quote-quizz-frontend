import { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../hooks/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout';

function Login() {

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
        <Layout>
            <Form onSubmit={handleSubmit} className="w-100">
                <h3 className="mb-5">
                    Admin Login
                </h3>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control ref={emailRef} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin me-3" /> : ''}
                    Login
                </Button>

                {errorMessage ?
                    <p ref={errorRef} className="text-danger py-3">{errorMessage}</p>
                    : ''
                }
            </Form>
        </Layout>
    );
}

export default Login;