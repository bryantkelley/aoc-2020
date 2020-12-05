import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import raw from './twoInput.txt';

function Two() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => arr.map((s, si) => {
        const [first, second, third] = s.split(' ');
        const [firstValue, secondValue] = first.split('-');
        const letter = second.substr(0, 1);
        const password = third;

        return { firstValue, secondValue, letter, password, raw: s, index: si };
      })).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const validPasswordsOne = useMemo(() => entries.filter((e) => {
    const characters = e.password.split('');
    let foundCount = 0;
    characters.forEach((c) => {
      if (c === e.letter) {
        foundCount = foundCount + 1;
      }
    });
    if (e.firstValue <= foundCount && foundCount <= e.secondValue) {
      return true;
    }
    return false;
  }), [entries]);

  const validPasswordsTwo = useMemo(() => entries.filter((e) => {
    const characters = e.password.split('');
    if (characters[e.firstValue - 1] === e.letter && characters[e.secondValue - 1] !== e.letter) {
      return true;
    }
    if (characters[e.secondValue - 1] === e.letter && characters[e.firstValue - 1] !== e.letter) {
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
              <div key={`entry-${e.index}`}>
                {e.raw}
              </div>
            ))}
          </Col>
          <Col>
            <Row>
              <Col>
                <h2>Part 1</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Count</h3>
                <div>{validPasswordsOne.length}</div>
              </Col>
              <Col>
                <h3>Valid Passwords:</h3>
                <div>{validPasswordsOne.map(vp => (
                  <div key={`result-one-${vp.index}`}>
                    {vp.raw}
                  </div>
                ))}</div>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <h2>Part 2</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Count</h3>
                <div>{validPasswordsTwo.length}</div>
              </Col>
              <Col>
                <h3>Valid Passwords:</h3>
                <div>{validPasswordsTwo.map(vp => (
                  <div key={`result-two-${vp.index}`}>
                    {vp.raw}
                  </div>
                ))}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col >
    </Row >
  );
}

export default Two;