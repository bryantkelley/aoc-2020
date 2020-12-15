import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Three() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => arr.map((s, si) => ({
        values: s.split(''),
        raw: s,
        index: si,
      }))).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const treesHitOne = useMemo(() => {
    let hitCount = 0;
    const slope = { x: 3, y: 1 };
    for (let i = 0; i < entries.length; i = i + slope.y) {
      if (entries[i].values[(slope.x * i) % entries[i].values.length] === '#') {
        hitCount = hitCount + 1;
      }
    }
    return hitCount;
  }, [entries]);

  const treesHitTwo = useMemo(() => [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ].map((s, si) => {
    let hitCount = 0;
    let missCount = 0;
    for (let i = 0; i < entries.length; i = i + s.y) {
      if (entries[i].values[(s.x * i / s.y) % entries[i].values.length] === '#') {
        hitCount = hitCount + 1;
      } else {
        missCount = missCount + 1;
      }
    }
    return { hitCount, missCount, index: si, slope: s };
  }), [entries]);

  const resultTwo = useMemo(() => {
    if (treesHitTwo.length) {
      let result = 1;
      treesHitTwo.forEach((th) => {
        result = result * th.hitCount;
      });
      return result;
    }
    return '';
  }, [treesHitTwo]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Three '}
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
              <h4>{treesHitOne}</h4>
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

export default Three;