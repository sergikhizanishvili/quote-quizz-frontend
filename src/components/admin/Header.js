import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header() {

    const { logout } = useAuth();
    const [offcanvasShow, setOfffcanvasShow] = useState(false);

    const handleLogout = async () => {
        await logout();
    }

    return (
        <Row className="border-bottom py-3 mb-4">
            <Col>
                <h3 className="m-0 p-0">Admin Panel</h3>
            </Col>

            <Col className="d-none d-md-flex align-items-center justify-content-end">
                <ul className="list-unstyled m-0 p-0 list-inline">
                    <li className="list-inline-item d-inline-flex align-items-center ms-3">
                        <Link to="/admin">Dashboard</Link>
                    </li>

                    <li className="list-inline-item d-inline-flex align-items-center ms-3">
                        <Link to="/admin/questions">Questions</Link>
                    </li>

                    <li className="list-inline-item d-inline-flex align-items-center ms-3">
                        <Button type="button" className="btn btn-link" onClick={handleLogout}>Logout</Button>
                    </li>
                </ul>
            </Col>

            <Col className="d-flex d-md-none align-items-center justify-content-end">
                <Button className="icon-btn text-dark" onClick={(e) => setOfffcanvasShow(true)}>
                    <FontAwesomeIcon icon={faBars} className="fa-lg" />
                </Button>

                <Offcanvas show={offcanvasShow} onHide={(e) => setOfffcanvasShow(false)} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Mobile Menu</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <ul className="list-unstyled m-0 p-0">
                            <li className="mb-3">
                                <Link to="/admin">Dashboard</Link>
                            </li>

                            <li className="mb-3">
                                <Link to="/admin/questions">Questions</Link>
                            </li>

                            <li className="mb-3">
                                <Button type="button" className="btn btn-link" onClick={handleLogout}>Logout</Button>
                            </li>
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas>
            </Col>
        </Row>
    );
}

export default Header;