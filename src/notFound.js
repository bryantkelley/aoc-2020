import { Col, Row } from "react-bootstrap";
import { useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <Row>
      <Col>
        <div>Ho ho oh no! Page <code>{location.pathname}</code> was not found.</div>
      </Col>
    </Row>
  );
}

export default NotFound;