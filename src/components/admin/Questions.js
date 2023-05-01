import Header from "./Header";
import Layout from "../Layout";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useState } from "react";
import Api from "../services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

function Questions() {

    const {cookies} = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = async () => {
        try {
            const res = await Api.get('/questions',
            {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`
                }
            });

            if (res.data) {
                setData(res.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <Header />

            <div className="d-flex justify-content-between align-items-center">
                <h4 className="m-0 p-0">Questions</h4>
                <Link to="/admin/create-question" className="btn btn-primary">New Question</Link>
            </div>

            {!loading && data.length > 0 ?
                <div className="mt-5">
                    {data.map((item, index) => (
                        <Link key={index} to={'/admin/questions/' + item.id} className="d-inline-flex w-100 align-items-center justify-content-between p-2 border mb-2 rounded">
                            <p className="m-0 p-0">
                                {item.question}
                            </p>
        
                            <h6 className="m-0 p-0">
                                <Badge bg="secondary">{item.type}</Badge>
                            </h6>
                        </Link>
                    ))}
                </div>
            : <div className="text-start mt-5"><FontAwesomeIcon icon={faSpinner} className="fa-4x fa-spin me-3 text-primary" /></div> }
        </Layout>
    );
}

export default Questions;