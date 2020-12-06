import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import raw from './sixInput.txt';

function Six() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => arr.map((s, si) => {
        // const binary = s.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1');
        // const row = parseInt(s.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'), 2);
        // const column = parseInt(s.substr(7, 10).replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'), 2);
        // const seat = row * 8 + column;
        // return { binary, row, column, seat, raw: s, index: si };
      })).then(arr => setEntries(arr));
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
          {/* <Col>
            {entries.map(e => (
              <div key={e.index}>
                <code>{e.raw}</code>
              </div>
            ))}
          </Col> */}
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
