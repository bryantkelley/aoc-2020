import React, { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Fourteen() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then((text) => {
        const result = [];
        let mask = [];
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('mask')) {
            mask = line.substring(7).split('');
          } else if (line.startsWith('mem')) {
            const address = line.split('[')[1].split(']')[0];
            const valueArray = `${parseInt(line.split(' = ')[1], 10).toString(2)}`.split('');
            const maskedValueArray = [];

            for (let j = 0; j < mask.length; j++) {
              if (mask[mask.length - j - 1] !== 'X') {
                maskedValueArray[mask.length - j - 1]= mask[mask.length - j - 1];
              } else {
                maskedValueArray[mask.length - j - 1] = valueArray[valueArray.length - j - 1] ?? '0';
              }
            }

            result.push({
              maskArray: mask,
              mask: mask.reduce((acc, cur) => `${acc}${cur}`),
              address,
              valueArray,
              maskedValueArray,
              value: parseInt(valueArray.reduce((acc, cur) => `${acc}${cur}`), 2),
              maskedValue: parseInt(maskedValueArray.reduce((acc, cur) => `${acc}${cur}`), 2),
            });
          }
        }
        return result;
      }).then((arr) => {
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

    const memory = [];
    entries.forEach((entry) => {
      memory[entry.address] = entry.maskedValue;
    });

    return memory.reduce((acc, cur) => acc + cur);
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
