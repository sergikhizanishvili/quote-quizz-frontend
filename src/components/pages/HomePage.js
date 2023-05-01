import { Button, Container, Form } from "react-bootstrap";
import Api from "../services/Api";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    const handleSubmit = async () => {

        try {
            const res = await Api.post('/sessions', {

            });

            navigate('/session/' + id);
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <Container md>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="type">
                    <Form.Check
                        inline
                        label="Binary"
                    />

                    <Form.Check
                        inline
                        label="Binary"
                    />
                </Form.Group>

                <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>

                <Form.Group controlId="emailAddress">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>

                <Button type="summit">Start Session</Button>
            </Form>
        </Container>
    )
}

export default HomePage;