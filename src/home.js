import React, { useState } from 'react';
import { Alert, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <Row>
      <Col>
        <h1>
          <FontAwesomeIcon icon={faTree} />
          {' '}
          Bryant's Advent of Code 2020
        </h1>
        <Alert
          variant="danger"
          show={showAlert}
          dismissible
          transition={false}
          onClose={() => setShowAlert(false)}
        >
          Use minus and plus buttons to navigate between days. Tap the number to turn your phone into a hand warmer.
        </Alert>
      </Col>
    </Row>
  );
}

export default Home;