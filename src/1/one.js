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
            <h2>Day One</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4>Matching Entries:</h4>
            <div>{matchingValuesOne.map(mv => (<h5 key={`result${mv}`}>{mv}</h5>))}</div>
          </Col>
          <Col>
            <h4>Result</h4>
            <h5>{resultOne}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 2</h3>
          </Col>
          <Col>
            <h4>Matching Entries:</h4>
            <div>{matchingValuesTwo.map(mv => (<h5 key={`result${mv}`}>{mv}</h5>))}</div>
          </Col>
          <Col>
            <h4>Result</h4>
            <h5>{resultTwo}</h5>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default One;