import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHollyBerry } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function One() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => arr.map(s => parseInt(s, 10))).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const matchingValuesOne = useMemo(() => {
    for (let i = 0; i < entries.length; i++) {
      for (let j = i; j < entries.length; j++) {
        if (entries[i] + entries[j] === 2020) {
          return [entries[i], entries[j]];
        }
      }
    }
    return [];
  }, [entries]);

  const resultOne = useMemo(() => {
    if (matchingValuesOne.length === 2) {
      return matchingValuesOne[0] * matchingValuesOne[1];
    }
    return '';
  }, [matchingValuesOne]);

  const matchingValuesTwo = useMemo(() => {
    for (let i = 0; i < entries.length; i++) {
      for (let j = i; j < entries.length; j++) {
        for (let k = j; k < entries.length; k++) {
          if (entries[i] + entries[j] + entries[k] === 2020) {
            return [entries[i], entries[j], entries[k]];
          }
        }
      }
    }
    return [];
  }, [entries]);

  const resultTwo = useMemo(() => {
    if (matchingValuesTwo.length === 3) {
      return matchingValuesTwo[0] * matchingValuesTwo[1] * matchingValuesTwo[2];
    }
    return '';
  }, [matchingValuesTwo]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day One '}
          <FontAwesomeIcon icon={faHollyBerry} />
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

export default One;