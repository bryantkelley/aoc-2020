import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import raw from './sixInput.txt';

function Six() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => setEntries(arr));
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
            <h1>Day Five</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <h2>Part 1</h2>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <h2>Part 2</h2>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Six;
