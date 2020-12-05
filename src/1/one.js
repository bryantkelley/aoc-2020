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

  const matchingValues = useMemo(() => {
    for (let i = 0; i < entries.length; i++) {
      for (let j = i; j < entries.length; j++) {
        if (entries[i] + entries[j] === 2020) {
          return [entries[i], entries[j]];
        }
      }
    }
    return [];
  }, [entries]);

  const result = useMemo(() => {
    if (matchingValues.length === 2) {
      return matchingValues[0] * matchingValues[1];
    }
    return '';
  }, [matchingValues])

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <div>Day One</div>
          </Col>
          <Col>
            <div>Matching Entries:</div>
            <div>{matchingValues.map(mv => (<div>{mv}</div>))}</div>
          </Col>
          <Col>
            <div>Result</div>
            <div>{result}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            Entries
            {entries.map((e) => (
              <Row key={e}>
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