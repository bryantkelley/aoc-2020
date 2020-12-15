import React, { useState, useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons';
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
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Eight '}
          <FontAwesomeIcon icon={faGlassCheers} />
        </h2>
      </Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 1</h3>
            </Col>
            <Col>
              <h4>{resultOne}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 2</h3>
            </Col>
            <Col>
              <h4>{resultTwo}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default Eight;
