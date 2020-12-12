import React, { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSleigh, faTree } from '@fortawesome/free-solid-svg-icons';
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
        const difference = direction - (parseInt(value /90) % 4);
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
    
  }, [entries]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2>Day Twelve</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4>Distance from Start</h4>
            <h5>{resultOne}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faSleigh} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 2</h3>
          </Col>
          <Col>
            <h4> </h4>
            <h5>{resultTwo}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faTree} />
            </h4>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Twelve;
