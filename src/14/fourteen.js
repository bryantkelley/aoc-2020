import React, { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Fourteen() {
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

  const resultOne = useMemo(() => {
    if (!entries.length) {
      return '';
    }

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
            <h2>Day Fourteen</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4> </h4>
            <h5>{resultOne}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faSnowflake} />
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
              <FontAwesomeIcon icon={faGlassWhiskey} />
            </h4>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Fourteen;
