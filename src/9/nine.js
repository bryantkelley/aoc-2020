import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faHollyBerry } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Nine() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then((arr) => {
        setEntries(arr);
      });
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2>Day Nine</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4> </h4>
            <h5>{ }</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faTree} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 2</h3>
          </Col>
          <Col>
            <h4> </h4>
            <h5>{ }</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faHollyBerry} />
            </h4>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Nine;
