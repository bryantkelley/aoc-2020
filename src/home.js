import React from 'react';
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
        <h5>By the end, this site may turn your phone into a hand warmer.</h5>
      </Col>
    </Row>
  );
}

export default Home;