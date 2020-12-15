import React, { useState, useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Nine() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n').map(line => parseInt(line, 10))).then((arr) => {
        setEntries(arr);
      });
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const [invalidNumber, setInvalidNumber] = useState('');
  useEffect(() => {
    function findInvalid() {
      for (let i = 25; i < entries.length; i++) {
        const matchingPairs = [];
        for (let j = i - 25; j < i - 1; j++) {
          if (entries[i] < entries[j]) {
            continue;
          }
          for (let k = j + 1; k < i; k++) {
            if (entries[i] === entries[j] + entries[k]) {
              matchingPairs.push({ first: entries[j], second: entries[k] });
            }
          }
        }
        if (!matchingPairs.length) {
          setInvalidNumber(entries[i]);
          break;
        }
      }
    }
    if (entries.length) {
      findInvalid();
    }
  }, [entries]);

  const [weakness, setWeakness] = useState('');
  useEffect(() => {
    function findWeakness() {
      const validNumbers = entries.filter(e => e < invalidNumber);
      for (let i = 0; i < validNumbers.length; i++) {
        let end = i;
        let found = false;
        const search = [validNumbers[i]];
        while (!found && end < validNumbers.length - 1) {
          end = end + 1;
          search.push(validNumbers[end]);
          const sum = search.reduce((total, num) => total + num);
          if (invalidNumber === sum) {
            found = true;
            const smallest = search.reduce((total, num) => {
              if (num < total) {
                return num;
              }
              return total;
            }, sum);
            const largest = search.reduce((total, num) => {
              if (num > total) {
                return num;
              }
              return total;
            }, 0);
            setWeakness(smallest + largest);
            break;
          }
          if (invalidNumber < sum) {
            // Number is too big! Stop searching for this.
            found = true;
          }
        }
      }
    }

    if (entries.length && invalidNumber && !weakness) {
      findWeakness();
    }
  });

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Nine '}
          <FontAwesomeIcon icon={faTree} />
        </h2>
      </Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 1</h3>
            </Col>
            <Col>
              <h4>{invalidNumber}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 2</h3>
            </Col>
            <Col>
              <h4>{weakness}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default Nine;
