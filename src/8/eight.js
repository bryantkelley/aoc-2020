import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Eight() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then((arr) => {
        return arr.map((row, ri) => {
          const [instruction, value] = row.split(' ');
          return { instruction, value, timesHit: 0, index: ri };
        });
      }).then((arr) => {
        return arr.map((row) => {
          const parents = arr.filter((pp) => {
            if (row.index > 0) {
              if (pp.instruction !== 'jmp' && pp.index === row.index - 1) {
                return true;
              }
              if (pp.instruction === 'jmp' && parseInt(pp.value, 10) === pp.index + row.index) {
                return true;
              }
            }
            return false;
          });

          const potentialParents = arr.filter((pp) => {
            if (row.index > 0) {
              if (pp.instruction === 'jmp' && pp.index === row.index - 1) {
                return true;
              }
              if (pp.instruction === 'nop' && parseInt(pp.value, 10) === pp.index + row.index) {
                return true;
              }
            }
            return false;
          });

          return { ...row, parents, potentialParents };
        });
      }).then((arr) => {
        setEntries(arr);
      });
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const [resultOne, setResultOne] = useState('');

  useEffect(() => {
    const program = entries.map(e => ({ ...e }));
    let pointer = 0;
    let end = false;
    let accumulator = 0;
    if (program.length) {
      while (!end) {
        const op = program[pointer];
        if (op.timesHit < 1) {
          if (op.instruction === 'acc') {
            program[pointer].timesHit = program[pointer].timesHit + 1;
            accumulator = accumulator + parseInt(op.value, 10);
            pointer = pointer + 1;
          } else if (op.instruction === 'jmp') {
            program[pointer].timesHit = program[pointer].timesHit + 1;
            pointer = pointer + parseInt(op.value, 10);
          } else {
            program[pointer].timesHit = program[pointer].timesHit + 1;
            pointer = pointer + 1;
          }
        } else {
          end = true;
        }
      }
      setResultOne(accumulator);
    }
  }, [entries]);

  const [resultTwo, setResultTwo] = useState('');

  useEffect(() => {
    if (entries.length) {
      for (let i = 0; i < entries.length; i++) {
        const program = entries.map((e) => {
          if (e.index === i) {
            if (e.instruction === 'jmp') {
              return { ...e, instruction: 'nop' };
            } else if (e.instruction === 'nop') {
              return { ...e, instruction: 'jmp' };
            }
          }
          return { ...e }
        });

        if (program[i].instruction === 'acc') {
          continue;
        }

        let pointer = 0;
        let accumulator = 0;
        let continuing = true;
        while (continuing) {
          if (pointer < program.length) {
            const op = program[pointer];
            if (op.timesHit < 1) {
              if (op.instruction === 'acc') {
                program[pointer].timesHit = program[pointer].timesHit + 1;
                accumulator = accumulator + parseInt(op.value, 10);
                pointer = pointer + 1;
              } else if (op.instruction === 'jmp') {
                program[pointer].timesHit = program[pointer].timesHit + 1;
                pointer = pointer + parseInt(op.value, 10);
              } else {
                program[pointer].timesHit = program[pointer].timesHit + 1;
                pointer = pointer + 1;
              }
            } else {
              continuing = false;
            }
          } else {
            setResultTwo(accumulator);
            continuing = false;
            break;
          }
        }
      }
    }
  }, [entries]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2>Day Eight</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4>First Run Value</h4>
            <h5>{resultOne}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faMugHot} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 2</h3>
          </Col>
          <Col>
            <h4>Fixed Run Value</h4>
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

export default Eight;
