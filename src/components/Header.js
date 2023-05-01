import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
    return (
        <Row className="border-bottom py-3 mb-4">
            <Col>
                <h3 className="m-0 p-0">Quote Quizz</h3>
            </Col>

            <Col className="d-flex align-items-center justify-content-end">
                <ul className="list-unstyled m-0 p-0 list-inline">
                    <li className="list-inline-item d-inline-flex align-items-center ms-3">
                        <Link to="/">Quizz</Link>
                    </li>

                    <li className="list-inline-item d-inline-flex align-items-center ms-3">
                        <Link to="/top">Top</Link>
                    </li>
                </ul>
            </Col>
        </Row>
    );
}

export default Header;