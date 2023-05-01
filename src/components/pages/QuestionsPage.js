import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import Api from '../services/Api';
import { Badge, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminHeader from '../admin/AdminHeader';

function QuestionsPage() {

    const {cookies} = useAuth();
    const [data, setData] = useState([]);

    const getData = async () => {

        try {
            const res = await Api.get('/questions', {
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

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container md>
            <AdminHeader />

            <h4 className="mb-4">Questions</h4>

            {data ? data.map((item, index) => (
                <Link to={'/question/' + item.id} className="d-inline-flex w-100 align-items-center justify-content-between p-2 border mb-2 rounded">
                    <p className="m-0 p-0">
                        {item.question}
                    </p>

                    <h6 className="m-0 p-0">
                        <Badge bg="secondary">{item.type}</Badge>
                    </h6>
                </Link>
            )) : ''}
        </Container>
    )
}

export default QuestionsPage;