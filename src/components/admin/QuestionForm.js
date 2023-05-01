import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function QuestionForm({ type, question, correct, answ1, answ2, answ3, callback }) {

    const [loading, setLoading] = useState(false);
    const [questionType, setQuestionType] = useState(type);
    const [questionText, setQuestionText] = useState(question);
    const [correctAnswer, setCorrectAnswer] = useState(correct);
    const [option1, setOption1] = useState(answ1);
    const [option2, setOption2] = useState(answ2);
    const [option3, setOption3] = useState(answ3);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            type: questionType,
            question: questionText,
            correct: correctAnswer,
            answers: JSON.stringify({
                answ1: option1,
                answ2: option2,
                answ3: option3
            })
        }

        setLoading(true);
        await callback(data);
        setLoading(false);
    }

    return (
        <Form className="mt-5" onSubmit={handleSubmit}>
            <Form.Group controlId="type" className="mb-3">
                <Form.Label>Question Type</Form.Label>
                <Form.Select onChange={(e) => setQuestionType(e.target.value)} value={questionType} disabled={loading}>
                    <option value="binary">Binary</option>
                    <option value="multiple">Multiple Choice</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="question" className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control value={questionText} onChange={(e) => setQuestionText(e.target.value)} disabled={loading} />
            </Form.Group>

            {'multiple' === questionType ?
                <>
                    <Form.Group controlId="option1" className="mb-3">
                        <Form.Label>Option 1</Form.Label>
                        <Form.Control value={option1} onChange={(e) => setOption1(e.target.value)} disabled={loading} />
                    </Form.Group>

                    <Form.Group controlId="option2" className="mb-3">
                        <Form.Label>Option 2</Form.Label>
                        <Form.Control value={option2} onChange={(e) => setOption2(e.target.value)} disabled={loading} />
                    </Form.Group>

                    <Form.Group controlId="option3" className="mb-3">
                        <Form.Label>Option 3</Form.Label>
                        <Form.Control value={option3} onChange={(e) => setOption3(e.target.value)} disabled={loading} />
                    </Form.Group>

                    <Form.Group controlId="crrectMultiple" className="mb-3">
                        <Form.Label>Correct Answer</Form.Label>
                        <Form.Select onChange={(e) => setCorrectAnswer(e.target.value)} value={correctAnswer} disabled={loading}>
                            <option value="">Please select...</option>
                            {option1 ? <option value="answ1">{option1}</option> : ''}
                            {option2 ? <option value="answ2">{option2}</option> : ''}
                            {option3 ? <option value="answ3">{option3}</option> : ''}
                        </Form.Select>
                    </Form.Group>
                </>
            : 
                <Form.Group controlId="correctBinary" className="mb-3">
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Select onChange={(e) => setCorrectAnswer(e.target.value)} value={correctAnswer} disabled={loading}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Form.Select>
                </Form.Group>
            }

            <Button type="submit" variant="primary" className="mt-3" disabled={loading}>
                {loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin me-3" /> : ''}
                Submit
            </Button>
        </Form>
    );
}

export default QuestionForm;