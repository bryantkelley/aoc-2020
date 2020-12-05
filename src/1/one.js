import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import raw from './oneInput.txt';

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
    <Row>
      <Col>
        <Row>
          <Col>
            <h1>Day One</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Part 1</h2>
          </Col>
          <Col>
            <h3>Matching Entries:</h3>
            <div>{matchingValuesOne.map(mv => (<div key={`result${mv}`}>{mv}</div>))}</div>
          </Col>
          <Col>
            <h3>Result</h3>
            <div>{resultOne}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Part 2</h2>
          </Col>
          <Col>
            <h3>Matching Entries:</h3>
            <div>{matchingValuesOne.map(mv => (<div key={`result${mv}`}>{mv}</div>))}</div>
          </Col>
          <Col>
            <h3>Result</h3>
            <div>{resultTwo}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Entries</h2>
            {entries.map((e) => (
            <Row key={`entry${e}`}>
              <Col>{e}</Col>
            </Row>
          ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default One;