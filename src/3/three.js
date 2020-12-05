import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import raw from './threeInput.txt';

function Three() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then(arr => arr.map((s, si) => ({
        values: s.split(''),
        raw: s,
        index: si,
      }))).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const treesHitOne = useMemo(() => {
    let hitCount = 0;
    const slope = { x: 3, y: 1 };
    for (let i = 0; i < entries.length; i = i + slope.y) {
      if (entries[i].values[(slope.x * i) % entries[i].values.length] === '#') {
        hitCount = hitCount + 1;
      }
    }
    return hitCount;
  }, [entries]);

  const treesHitTwo = useMemo(() => [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ].map((s, si) => {
    let hitCount = 0;
    let missCount = 0;
    for (let i = 0; i < entries.length; i = i + s.y) {
      if (entries[i].values[(s.x * i / s.y) % entries[i].values.length] === '#') {
        hitCount = hitCount + 1;
      } else {
        missCount = missCount + 1;
      }
    }
    return { hitCount, missCount, index: si, slope: s };
  }), [entries]);

  const resultTwo = useMemo(() => {
    if (treesHitTwo.length) {
      let result = 1;
      treesHitTwo.forEach((th) => {
        result = result * th.hitCount;
      });
      return result;
    }
    return '';
  }, [treesHitTwo]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h1>Day Three</h1>
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
          <Col>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h2>Part 1</h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3>Trees Hit</h3>
                    <div>{treesHitOne}</div>
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
                    <h3>Trees Hit</h3>
                    {treesHitTwo.map(th => (
                      <div key={`result-two-${th.index}`}>
                        {`(${th.slope.x},${th.slope.y}) ${th.hitCount} ${th.missCount}`}
                      </div>
                    ))}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3>Result</h3>
                    <div>{resultTwo}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col >
    </Row >
  );
}

export default Three;