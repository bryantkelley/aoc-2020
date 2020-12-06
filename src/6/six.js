import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowman, faHollyBerry } from '@fortawesome/free-solid-svg-icons';
import raw from './sixInput.txt';

function Six() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then((arr) => {
        const out = [];
        for (let i = 0; i < arr.length; i++) {
          out.push(arr[i]);
        }
        return out;
      }).then((arr) => {
        const output = [];
        let start = 0;
        let end = 0;
        arr.forEach((ar) => {
          if (ar === '') {
            output.push(arr.slice(start, end));
            start = end + 1;
            end = end + 1;
          } else {
            end = end + 1;
          }
        });
        output.push(arr.slice(start, end));
        return output;
      }).then(arr => arr.map(ar => ar.map(item => item.split('')))).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const sum = useMemo(() => {
    if (entries.length) {
      const questions = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const groupSums = entries.map((group) => {
        const answers = group.flat();
        let count = 0;
        questions.forEach((q) => {
          if (answers.includes(q)) {
            count = count + 1;
          }
        });
        return count;
      });
      return groupSums.reduce((acc, cur) => acc + cur);
    }
    return '';
  }, [entries]);

  const correctSum = useMemo(() => {
    if (entries.length) {
      const questions = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const groupSums = entries.map((group) => {
        let totalCount = 0;
        questions.forEach((q) => {
          let count = 0;
          group.forEach((answers) => {
            if (answers.includes(q)) {
              count = count + 1;
            }
          });

          if (count === group.length) {
            totalCount = totalCount + 1;
          }
        });
        return totalCount;
      });
      return groupSums.reduce((acc, cur) => acc + cur);
    }
    return '';
  }, [entries]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2>Day Six</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4>Sum</h4>
            <h5>{sum}</h5>
          </Col><Col>
            <h4>
              <FontAwesomeIcon icon={faSnowman} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 2</h3>
          </Col>
          <Col>
            <h4>Correct Sum</h4>
            <h5>{correctSum}</h5>
          </Col><Col>
            <h4>
              <FontAwesomeIcon icon={faHollyBerry} />
            </h4>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Six;
