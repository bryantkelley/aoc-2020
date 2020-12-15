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
        let mask = '';
        let maskArray = [];
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('mask')) {
            mask = line.substring(7);
            maskArray = mask.split('');
          } else if (line.startsWith('mem')) {
            const address = line.split('[')[1].split(']')[0];
            const value = parseInt(line.split(' = ')[1], 10);

            result.push({
              maskArray,
              mask,
              address,
              value,
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

    const inst = entries.map((entry) => {
      const { value, maskArray } = entry;
      const valueArray = value.toString(2).split('');
      const maskedValueArray = [];

      for (let j = 0; j < maskArray.length; j++) {
        if (maskArray[maskArray.length - j - 1] !== 'X') {
          maskedValueArray[maskArray.length - j - 1]= maskArray[maskArray.length - j - 1];
        } else {
          maskedValueArray[maskArray.length - j - 1] = valueArray[valueArray.length - j - 1] ?? '0';
        }
      }

      const maskedValue = parseInt(maskedValueArray.reduce((acc, cur) => `${acc}${cur}`), 2);

      return { ...entry, maskedValue }
    });

    const memory = [];
    inst.forEach((entry) => {
      memory[entry.address] = entry.maskedValue;
    });

    return memory.reduce((acc, cur) => acc + cur);
  }, [entries]);

  const resultTwo = useMemo(() => {
    if (!entries.length) {
      return '';
    }

    const inst = entries.map((entry) => {
      const { address } = entry;
      const addressArray = parseInt(address, 10).toString(2).split('');
      return { ...entry, addressArray };
    }).map((entry) => {
      const { maskArray, addressArray, value } = entry;
      let output = [''];
      for (let i = 0; i < maskArray.length; i++) {
        if (maskArray[maskArray.length - i - 1] === '0') {
          output = output.map(out => (`${addressArray[addressArray.length - i - 1] ?? '0'}${out}`));
        } else if (maskArray[maskArray.length - i - 1] === '1') {
          output = output.map(out => (`1${out}`));
        } else {
          output = output.map(out => (`0${out}`)).concat(output.map(out => (`1${out}`)));
        }
      }
      return { value, addresses: output.map(out => parseInt(out, 2)) };
    });

    console.log(inst);

    const total = inst.length;
    const half = total / 2;
    const quarter = half / 2;

    const memory = {};

    for (let i = 0; i < quarter; i++) {
      const { value, addresses } = inst[i];
      for (let j = 0; j < addresses.length / 2; j++) {
        memory[addresses[j]] = value;
      }
      for (let j = addresses.length / 2; j < addresses.length; j++) {
        memory[addresses[j]] = value;
      }
    }

    for (let i = quarter; i < half; i++) {
      const { value, addresses } = inst[i];
      for (let j = 0; j < addresses.length / 2; j++) {
        memory[addresses[j]] = value;
      }
      for (let j = addresses.length / 2; j < addresses.length; j++) {
        memory[addresses[j]] = value;
      }
    }

    for (let i = half; i < half + quarter; i++) {
      const { value, addresses } = inst[i];
      for (let j = 0; j < addresses.length / 2; j++) {
        memory[addresses[j]] = value;
      }
      for (let j = addresses.length / 2; j < addresses.length; j++) {
        memory[addresses[j]] = value;
      }
    }

    for (let i = half + quarter; i < total; i++) {
      const { value, addresses } = inst[i];
      for (let j = 0; j < addresses.length / 2; j++) {
        memory[addresses[j]] = value;
      }
      for (let j = addresses.length / 2; j < addresses.length; j++) {
        memory[addresses[j]] = value;
      }
    }

    let sum = 0;

    Object.entries(memory).forEach((pair) => {
      sum = sum + pair[1];
    });

    return sum;
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
