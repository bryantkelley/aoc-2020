import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
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
            <h1>Day Five</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Part 1</h2>
          </Col>
          <Col>
            <h3>Highest Seat ID:</h3>
            <div>{highestSeat.seat}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Part 2</h2>
          </Col>
          <Col>
            <h3>My Seat:</h3>
            <div>{missingSeatID}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            {entries.map(e => (
              <div key={e.index}>
                <code>{e.raw}</code>
              </div>
            ))}
          </Col>
        </Row>
      </Col >
    </Row >
  );
}

export default Five;
