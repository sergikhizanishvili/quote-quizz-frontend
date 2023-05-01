import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Layout from "../Layout";
import QuestionForm from "./QuestionForm";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useState } from "react";
import Api from "../services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

function Question() {

    const {id} = useParams();
    const {cookies} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [question, setQuestion] = useState({});

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = async () => {
        try {
            const res = await Api.get('/questions/' + id,
            {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`
                }
            });

            if (res.data) {
                setQuestion(res.data);
                setLoading(false);
            }
        } catch (error) {
            navigate('/admin');
        }
    }

    const handleSubmit = async (data) => {

        setError('');
        setSuccess('');

        try {
            const res = await Api.patch('/questions/' + id, data,
            {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (res.data) {
                setSuccess('Question has been updated successfully');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const deleteQuestion = async () => {
        setError('');
        setSuccess('');

        try {
            await Api.delete('/questions/' + id,
            {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`,
                }
            });

            navigate('/admin/questions');
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <Layout>
            <Header />

            <div className="d-flex justify-content-between align-items-center">
                <h4 className="m-0 p-0">Edit Question</h4>
            </div>

            {!loading ?
                <>
                    <QuestionForm
                        type={question.type}
                        question={question.question}
                        correct={question.correct}
                        answ1={'multiple' === question.type ? question.answers.answ1 : null}
                        answ2={'multiple' === question.type ? question.answers.answ2 : null}
                        answ3={'multiple' === question.type ? question.answers.answ3 : null}
                        callback={handleSubmit}
                    />

                    <Button className="btn btn-link link-danger mt-5 float-end" onClick={deleteQuestion}>Delete Question</Button>

                    {error ?
                        <p className="text-danger py-3">{error}</p>
                        : ''
                    }

                    {success ?
                        <p className="text-success py-3">{success}</p>
                        : ''
                    }
                </>
            : <div className="text-start mt-5"><FontAwesomeIcon icon={faSpinner} className="fa-4x fa-spin me-3 text-primary" /></div> }
        </Layout>
    );
}

export default Question;