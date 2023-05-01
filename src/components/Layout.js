import { Col, Container, Row } from "react-bootstrap";

function Layout({ children }) {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={8} lg={6} xl={6} className="mx-auto p-4">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default Layout;