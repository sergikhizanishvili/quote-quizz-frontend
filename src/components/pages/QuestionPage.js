import { Button, Container, Form } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import { useState } from "react";

const options = [
    {
        id: 'answ1',
        desc: 'First Option'
    },
    {
        id: 'answ2',
        desc: 'Second Option'
    },
    {
        id: 'answ2',
        desc: 'Third Option'
    }
];

function QuestionPage() {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [type, setType] = useState('binary')

    const getData = async () => {

        try {
            const res = await Api.get('/questions/' + id, {
                withCredentials: false,
                headers: {
                    'Authorization': `Bearer ${cookies.token}`
                }
            });

            setData(res.data);

        } catch(error) {
            console.log(error);
        }
    };

    return (
        <Container md>
            <AdminHeader />

            <h4 className="mb-4">Single Question</h4>

            <Form>
                <Form.Group controlId="type" className="mb-3">
                    <Form.Label>Question Type</Form.Label>
                    <Form.Select onChange={(e) => setType(e.target.value)}>
                        <option value="binary">Binary</option>
                        <option value="multiple">Multiple Choice</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="question" className="mb-3">
                    <Form.Label>Question</Form.Label>
                    <Form.Control value={data.question} />
                </Form.Group>

                {'binary' === type ?
                    <Form.Group controlId="correctBinary" className="mb-3">
                        <Form.Label>Correct Answer</Form.Label>
                        <Form.Select>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </Form.Select>
                    </Form.Group>
                :
                    <>
                        {options.map((item, index) => (
                            <Form.Group key={index} controlId={item.id} className="mb-3">
                                <Form.Label>{item.desc}</Form.Label>
                                <Form.Control onChange={(e) => setOptions(e.target.value)} />
                            </Form.Group>
                        ))}

                        <Form.Group controlId="correctMultiple" className="mb-3">
                            <Form.Label>Correct Answer</Form.Label>
                            <Form.Select>
                                {answers.map((item, index) =>(
                                    <option value={item.id}>{item.desc}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </>
                }

                <Button type="submit" variant="primary">
                    Submit
                </Button>

                <Button type="btn btn-link link-danger">
                    Delete Question
                </Button>
            </Form>
            
        </Container>
    );
}

export default QuestionPage;