import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Api from "./services/Api";
import Header from "./Header";

function TopScorers() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = async () => {
        try {
            const res = await Api.get('/sessionstop');

            if (res.data) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    return (
        <Layout>
            <Header />

            <Row className="fw-bold py-3 border-bottom d-none d-md-flex">
                <Col xs={12} md={3}>
                    Full name
                </Col>

                <Col xs={12} md={4}>
                    Email address
                </Col>

                <Col xs={12} md={2}>
                    Score
                </Col>

                <Col xs={12} md={3}>
                    Time
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

                    <Col xs={12} md={2}>
                        <small>
                            {(item.correct / item.questions.length * 100).toFixed(0)}%
                        </small>
                    </Col>

                    <Col xs={12} md={3}>
                        <small>
                            00:{str_pad_left(Math.floor(item.diff / 60), '0', 2) + ':' + str_pad_left(item.diff - Math.floor(item.diff / 60) * 60, '0', 2)}
                        </small>
                    </Col>
                </Row>
            ))}
        </Layout>
    )
}

export default TopScorers;