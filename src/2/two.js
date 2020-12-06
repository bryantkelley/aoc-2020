import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHollyBerry, faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';
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
            <h2>Day Two</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4>Valid Password Count</h4>
            <h5>{validPasswordsOne.length}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faHollyBerry} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 2</h3>
          </Col>
          <Col>
            <h4>Valid Password Count</h4>
            <h5>{validPasswordsTwo.length}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faGlassWhiskey} />
            </h4>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Two;