import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHollyBerry, faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Two() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => arr.map((s, si) => {
        const [first, second, third] = s.split(' ');
        const [firstValue, secondValue] = first.split('-');
        const letter = second.substr(0, 1);
        const password = third;

        return { firstValue, secondValue, letter, password, raw: s, index: si };
      })).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const validPasswordsOne = useMemo(() => entries.filter((e) => {
    const characters = e.password.split('');
    let foundCount = 0;
    characters.forEach((c) => {
      if (c === e.letter) {
        foundCount = foundCount + 1;
      }
    });
    if (e.firstValue <= foundCount && foundCount <= e.secondValue) {
      return true;
    }
    return false;
  }), [entries]);

  const validPasswordsTwo = useMemo(() => entries.filter((e) => {
    const characters = e.password.split('');
    if (characters[e.firstValue - 1] === e.letter && characters[e.secondValue - 1] !== e.letter) {
      return true;
    }
    if (characters[e.secondValue - 1] === e.letter && characters[e.firstValue - 1] !== e.letter) {
      return true;
    }
    return false;
  }), [entries]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Two '}
          <FontAwesomeIcon icon={faGlassWhiskey} />
        </h2>
      </Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 1</h3>
            </Col>
            <Col>
              <h4>{validPasswordsOne.length}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 2</h3>
            </Col>
            <Col>
              <h4>{validPasswordsTwo.length}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default Two;