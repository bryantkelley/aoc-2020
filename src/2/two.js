import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import raw from './twoInput.txt';

function Two() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => arr.map(s => {
        const [first, second, third] = s.split(' ');
        console.log(s, first, second, third);
        const [min, max] = first.split('-');
        const letter = second.substr(0, 1);
        const password = third;

        return { min, max, letter, password, raw: s };
      })).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const validPasswords = useMemo(() => entries.filter((e) => {
    const characters = e.password.split('');
    let foundCount = 0;
    characters.forEach((c) => {
      if (c === e.letter) {
        foundCount = foundCount + 1;
      }
    });
    if (e.min <= foundCount && foundCount <= e.max) {
      return true;
    }
    return false;
  }), [entries]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h1>Day Two</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Entries</h2>
            {entries.map((e) => (
              <div key={`result${e.password}`}>
                {e.raw}
              </div>
            ))}
          </Col>
          <Col>
            <Row>
              <Col>
                <h2>Part 1</h2>
              </Col>
              <Col>
                <h3>Valid Passwords:</h3>
                <div>{validPasswords.map(vp => (
                  <div key={`result${vp.password}`}>
                    {vp.raw}
                  </div>
                ))}</div>
              </Col>
              <Col>
                <h3>Count</h3>
                <div>{validPasswords.length}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Two;