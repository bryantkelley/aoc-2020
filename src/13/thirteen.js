import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Thirteen() {
  const [arrival, setArrival] = useState(0);
  const [buses, setBuses] = useState([])

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then((text) => {
        const [arr, newBuses] = text.split('\n');
        const filteredBuses = newBuses.split(',');
        setArrival(parseInt(arr, 10));
        setBuses(filteredBuses);
      });
    }

    if (!buses.length) {
      getEntries();
    }
  }, [buses]);

  const resultOne = useMemo(() => {
    if (!buses.length) {
      return '';
    }

    const filteredBuses = buses.filter(bus => bus !== 'x').map(bus => parseInt(bus, 10))

    let found = false;
    let currentTime = arrival;
    let busId = 0;
    while (!found) {
      let theOne = 0;
      let busFound = false;
      for (let i = 0; i < filteredBuses.length; i++) {
        if (currentTime % filteredBuses[i] === 0) {
          busFound = true;
          theOne = filteredBuses[i];
        }
      }

      if (busFound) {
        found = true;
        busId = theOne;
      } else {
        currentTime = currentTime + 1;
      }
    }

    return busId * (currentTime - arrival);

  }, [buses, arrival]);

  const resultTwo = useMemo(() => {
    if (!buses.length) {
      return '';
    }

    const entries = buses.map((bus, bi) => ({
      value: bus === 'x' ? 'x' : parseInt(bus, 10),
      index: bi,
    })).filter(b => b.value !== 'x');

    let currentTime = entries[0].value;
    let step = entries[0].value;
    for (let i = 1; i < entries.length; i++) {
      const { value, index } = entries[i];

      while ((currentTime + index) % value !== 0) {
        currentTime = currentTime + step;
      }
      step = step * value;
    }
    return currentTime;
  }, [buses]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Thirteen '}
          <FontAwesomeIcon icon={faGlassCheers} />
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

export default Thirteen;
