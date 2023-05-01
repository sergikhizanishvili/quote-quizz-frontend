import Layout from "../Layout";
import Header from "./Header";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Api from "../services/Api";

function Dashboard() {

    const {cookies} = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = async () => {
        try {
            const res = await Api.get('/sessions',
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
                <h4 className="m-0 p-0">Dashboard</h4>
            </div>

            {!loading && data.length > 0 ?
                <div className="mt-5">
                    <Row className="fw-bold py-3 border-bottom d-none d-md-flex">
                        <Col xs={12} md={3}>
                            Full name
                        </Col>

                        <Col xs={12} md={4}>
                            Email address
                        </Col>

                        <Col xs={12} md={1}>
                            Score
                        </Col>

                        <Col xs={12} md={2}>
                            Unanswered
                        </Col>

                        <Col xs={12} md={2}>
                            Submitted at
                        </Col>
                    </Row>

                    {data.map((item, index) => (
                        <Row className="py-2 border-bottom" key={index}>
                            <Col xs={12} md={3}>
                                <small>
                                    {item.first_name} {item.last_name}
                                </small>
                            </Col>

                            <Col xs={12} md={4}>
                                <small>
                                    {item.email}
                                </small>
                            </Col>

                            <Col xs={12} md={1}>
                                <small>
                                    {(item.correct / item.questions.length * 100).toFixed(0)}%
                                </small>
                            </Col>

                            <Col xs={12} md={2}>
                                <small>
                                    {item.questions.length - item.correct}
                                </small>
                            </Col>

                            <Col xs={12} md={2}>
                                <small>
                                    {item.ended ? item.ended.split('T')[0] + ' ' + item.ended.split('T')[1].split('.')[0] : ''}
                                </small>
                            </Col>
                        </Row>
                    ))}
                </div>
            : <div className="text-start mt-5"><FontAwesomeIcon icon={faSpinner} className="fa-4x fa-spin me-3 text-primary" /></div> }
        </Layout>
    )
}

export default Dashboard;