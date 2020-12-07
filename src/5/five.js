import React, { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faTree } from '@fortawesome/free-solid-svg-icons';
import raw from './fiveInput.txt';

function Five() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => arr.map((s, si) => {
        const binary = s.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1');
        const row = parseInt(s.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'), 2);
        const column = parseInt(s.substr(7, 10).replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'), 2);
        const seat = row * 8 + column;
        return { binary, row, column, seat, raw: s, index: si };
      })).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const highestSeat = useMemo(() => {
    let highest = entries[0] ?? {};
    entries.forEach((e) => {
      if (e.seat > highest.seat) {
        highest = e;
      }
    });
    return highest;
  }, [entries]);

  const missingSeatID = useMemo(() => {
    const sorted = entries.sort(function (a, b) { return a.seat - b.seat });
    let mySeat = '';
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].seat - sorted[i - 1].seat === 2) {
        mySeat = sorted[i].seat - 1;
      }
    }
    return mySeat;
  }, [entries]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2>Day Five</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4>Highest Seat ID:</h4>
            <h5>{highestSeat.seat}</h5>
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
            <h4>My Seat:</h4>
            <h5>{missingSeatID}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faSnowflake} />
            </h4>
          </Col>
        </Row>
      </Col >
    </Row >
  );
}

export default Five;
