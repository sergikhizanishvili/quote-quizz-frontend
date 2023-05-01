import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Header from "./Header";
import QuestionForm from "./QuestionForm";
import Api from "../services/Api";
import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

function CreateQuestion() {

    const {cookies} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (data) => {

        try {
            const res = await Api.post('/questions', data,
            {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`
                }
            });

            if (res.data.id) {
                navigate('/admin/questions/' + res.data.id);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <Layout>
            <Header />

            <div className="d-flex justify-content-between align-items-center">
                <h4 className="m-0 p-0">New Question</h4>
            </div>

            <QuestionForm type="binary" question="" correct="yes" answ1="" answ2="" answ3="" error={error} callback={handleSubmit} />

            {error ?
                <p className="text-danger py-3">{error}</p>
                : ''
            }
        </Layout>
    );
}

export default CreateQuestion;