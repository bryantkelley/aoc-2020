import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

function Home() {


  return (
    <Row>
      <Col>
        <h1>
          <FontAwesomeIcon icon={faTree} />
          {' '}
          Bryant's Advent of Code 2020
        </h1>
      </Col>
    </Row>
  );
}

export default Home;