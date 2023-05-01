import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Api from "./services/Api";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Header from "./Header";

function Home() {
    const navigate = useNavigate();
    const [type, setType] = useState('binary');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setErrorMessage('');
    }, [email, firstName, lastName]);

    const startSession = async (e) => {
        e.preventDefault();

        if (!email || !firstName || !lastName) {
            setErrorMessage('Please fill out the fields!');
            return;
        }

        setLoading(true);

        try {
            const res = await Api.post('sessions', {
                type: type,
                email: email,
                first_name: firstName,
                last_name: lastName
            });

            if (res.data.id) {
                navigate('/session/' + res.data.id);
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    return (
        <Layout>
            <Header />

            <Form onSubmit={startSession} className="w-100 mt-5">
                <Row>
                    <Col xs={6}>
                        <Form.Check
                            type="radio"
                            name="type"
                            id="typeBinary"
                            value="binary"
                            label="Binary"
                            checked={'binary' === type}
                            onChange={(e) => setType(e.target.value)}
                            className="py-3 px-5 w-100 border rounded"
                        />
                    </Col>

                    <Col xs={6}>
                        <Form.Check
                            type="radio"
                            name="type"
                            id="typeMultiple"
                            value="multiple"
                            label="Multiple Choice"
                            checked={'multiple' === type}
                            onChange={(e) => setType(e.target.value)}
                            className="py-3 px-5 w-100 border rounded"
                        />
                    </Col>

                    <Col xs={12} className="mt-3 mb-3">
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6} className="mb-3">
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6} className="mb-4">
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={(e) => setLastName(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12}>
                        <Button type="submit" className="w-100 btn-lg" variant="primary">
                            {loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin me-3" /> : ''}
                            Start Quizz
                        </Button>

                        {errorMessage ?
                            <p className="text-danger py-3">{errorMessage}</p>
                            : ''
                        }
                    </Col>
                </Row>
            </Form>
        </Layout>
    );
}

export default Home;