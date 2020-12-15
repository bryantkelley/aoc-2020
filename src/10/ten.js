import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGifts } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Ten() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n').map(line => parseInt(line, 10)).sort((a, b) => a - b)).then((arr) => {
        setEntries(arr);
      });
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const resultOne = useMemo(() => {
    if (!entries.length) {
      return '';
    }

    const differences = [0, 0, 1];
    let lastValue = 0;

    entries.forEach((e) => {
      const diff = e - lastValue;
      if (diff === 1) {
        differences[0] = differences[0] + 1;
      } else if (diff === 2) {
        differences[1] = differences[1] + 1;
      } else if (diff === 3) {
        differences[2] = differences[2] + 1;
      }
      lastValue = e;
    });

    return differences[0] * differences[2];
  }, [entries]);

  const resultTwo = useMemo(() => {
    if (!entries.length) {
      return '';
    }

    const values = [0, ...entries];

    const nodes = [];
    for (let i = 0; i < values.length; i++) {
      let children = 0;

      for (let j = i + 1; j < values.length && j < i + 4; j++) {
        const diff = values[j] - values[i];
        if (diff === 1 || diff === 2 || diff === 3) {
          children = children + 1;
        }
      }

      nodes.push(children);
    }

    return nodes
      .reduce((total, cur) => `${total}${cur}`, '')
      .split('11')
      .map(n => n.replace('1', ''))
      .map((p) => {
        if (p === '332') {
          return 7;
        }
        if (p === '32') {
          return 4;
        }
        if (p === '2') {
          return 2;
        }
        return 1;
      })
      .reduce((total, cur) => total * cur, 1);
  }, [entries]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Ten '}
          <FontAwesomeIcon icon={faGifts} />
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

export default Ten;
