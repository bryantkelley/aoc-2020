import React, { useState, useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';

function Fifteen() {
  const [resultOne, setResultOne] = useState('');
  const [resultTwo, setResultTwo] = useState('');

  useEffect(() => {
    function getResult() {
      const memory = [8, 0, 17, 4, 1, 12];

      while (memory.length < 2020) {
        const currentIndex = memory.length - 1;
        const lastNumber = memory[currentIndex];
        const lastIndex = memory.slice(0, -1).lastIndexOf(lastNumber);
        if (lastIndex >= 0) {
          memory.push(currentIndex - lastIndex);
        } else {
          memory.push(0);
        }
      }

      setResultOne(memory[2019]);
    }

    if (resultOne === '') {
      getResult();
    }
  });

  useEffect(() => {
    function getResult() {
      const memory = [8, 0, 17, 4, 1, 12];
      const lastTime = {};
      memory.forEach((value, index) => {
        lastTime[value] = index;
      });

      while (memory.length < 30000000) {
        const currentIndex = memory.length - 1;
        const lastNumber = memory[currentIndex];
        const lastIndex = lastTime[lastNumber] ?? -1;
        if (lastIndex >= 0 && lastIndex !== currentIndex) {
          memory.push(currentIndex - lastIndex);
        } else {
          memory.push(0);
        }
        lastTime[lastNumber] = currentIndex;
      }

      setResultTwo(memory[29999999]);
    }

    if (resultOne === '') {
      getResult();
    }
  });

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Fifteen '}
          <FontAwesomeIcon icon={faSleigh} />
        </h2>
      </Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 1</h3>
            </Col>
            <Col>
              <h4>{resultOne}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 2</h3>
            </Col>
            <Col>
              <h4>{resultTwo}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default Fifteen;
