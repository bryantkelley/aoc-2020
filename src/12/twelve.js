import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowman } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Twelve() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n').map(line => ({ action: line.substring(0, 1), value: parseInt(line.substring(1)) }))).then((arr) => {
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

    // directions => ['east', 'south', 'west', 'north']
    let direction = 0;
    let x = 0; // east/west distance
    let y = 0; // north/south distance

    entries.forEach((line) => {
      const { action, value } = line;
      if (action === 'N') {
        // Move +y
        y = y + value;
      }
      if (action === 'S') {
        // Move -y
        y = y - value;
      }
      if (action === 'E') {
        // Move +x
        x = x + value;
      }
      if (action === 'W') {
        // Move -x
        x = x - value;
      }
      if (action === 'L') {
        // Turn Left
        const difference = direction - (parseInt(value / 90) % 4);
        direction = difference < 0 ? 4 + difference : difference;

      }
      if (action === 'R') {
        // Turn Right
        direction = (direction + parseInt(value / 90)) % 4;
      }
      if (action === 'F') {
        // Move in direction
        if (direction === 3) {
          y = y + value;
        }
        if (direction === 1) {
          y = y - value;
        }
        if (direction === 0) {
          x = x + value;
        }
        if (direction === 2) {
          x = x - value;
        }
      }
    });

    return Math.abs(x) + Math.abs(y);
  }, [entries]);

  const resultTwo = useMemo(() => {
    if (!entries.length) {
      return '';
    }

    let x = 0; // east/west distance
    let y = 0; // north/south distance
    let wx = 10;
    let wy = 1;

    entries.forEach((line) => {
      const { action, value } = line;
      if (action === 'N') {
        // Move +y
        wy = wy + value;
      }
      if (action === 'S') {
        // Move -y
        wy = wy - value;
      }
      if (action === 'E') {
        // Move +x
        wx = wx + value;
      }
      if (action === 'W') {
        // Move -x
        wx = wx - value;
      }
      if (action === 'L') {
        // Rotate Anti-Clockwise
        const difference = Math.abs(parseInt(value / 90) % 4);
        if (difference === 1) {
          const oldWX = wx;
          wx = -wy;
          wy = oldWX;
        } else if (difference === 2) {
          wx = -wx;
          wy = -wy;
        } else if (difference === 3) {
          const oldWX = wx;
          wx = wy;
          wy = -oldWX;
        }
      }
      if (action === 'R') {
        // Rotate Clockwise
        const difference = Math.abs(parseInt(value / 90) % 4);
        if (difference === 3) {
          const oldWX = wx;
          wx = -wy;
          wy = oldWX;
        } else if (difference === 2) {
          wx = -wx;
          wy = -wy;
        } else if (difference === 1) {
          const oldWX = wx;
          wx = wy;
          wy = -oldWX;
        }
      }
      if (action === 'F') {
        // Move in direction
        x = x + value * wx;
        y = y + value * wy;
      }
    });

    return Math.abs(x) + Math.abs(y);
  }, [entries]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Twelve '}
          <FontAwesomeIcon icon={faSnowman} />
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

export default Twelve;
