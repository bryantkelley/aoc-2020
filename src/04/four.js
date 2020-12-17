import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCandyCane } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Four() {
  const [passports, setPassports] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then((arr) => {
        const entries = [];
        for (let i = 0; i < arr.length; i++) {
          const rowEntries = arr[i].split(' ');
          const singleEntries = rowEntries.map((re) => {
            const [key, value] = re.split(':');
            return { key, value };
          });
          singleEntries.forEach(se => entries.push(se));
        }
        return entries;
      }).then(arr => {
        const output = [];
        let start = 0;
        let end = 0;
        arr.forEach((ar) => {
          if (ar.key === '') {
            output.push(arr.slice(start, end));
            start = end + 1;
            end = end + 1;
          } else {
            end = end + 1;
          }
        });
        output.push(arr.slice(start, end));
        return output;
      }).then((arr) => arr.map((passport) => {
        const temp = {};
        passport.forEach(pair => temp[pair.key] = pair.value);
        return temp;
      })).then(arr => setPassports(arr));
    }

    if (!passports.length) {
      getEntries();
    }
  }, [passports]);

  const validPassportsOne = useMemo(() => passports.filter((p) => {
      if (p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid) {
        return true;
      }
      return false;
    }), [passports]);

  const validPassportsTwo = useMemo(() => validPassportsOne.filter((p) => {
    const validBirthYear = 1920 <= p.byr && p.byr <= 2002;
    const validIssueYear = 2010 <= p.iyr && p.iyr <= 2020;
    const validExpireYear = 2020 <= p.eyr && p.eyr <= 2030;
    let validHeight = false;
    if (p.hgt.endsWith('cm')) {
      const height = parseInt(p.hgt.replace('cm', ''), 10) ?? 0;
      if (150 <= height && height <= 193) {
        validHeight = true;
      }
    } else if (p.hgt.endsWith('in')) {
      const height = parseInt(p.hgt.replace('in', ''), 10) ?? 0;
      if (59 <= height && height <= 76) {
        validHeight = true;
      }
    }
    let validHair = false;
    if (p.hcl.startsWith('#')) {
      const hairColor = parseInt(p.hcl.replace('#', ''), 16);
      if (hairColor || hairColor === 0) {
        validHair = true;
      }
    }
    const validEyes = p.ecl === 'amb' || p.ecl === 'blu' || p.ecl === 'brn' || p.ecl === 'gry' || p.ecl === 'grn' || p.ecl === 'hzl' || p.ecl === 'oth';
    const validPassportId = p.pid.split('').length === 9;
    if (
      validBirthYear &&
      validIssueYear &&
      validExpireYear &&
      validHeight &&
      validHair &&
      validEyes &&
      validPassportId
    ) {
      return true;
    }
    return false;
  }), [validPassportsOne]);

  const resultOne = useMemo(() => validPassportsOne.length ? validPassportsOne.length : '', [validPassportsOne]);
  const resultTwo = useMemo(() => validPassportsTwo.length ? validPassportsTwo.length : '', [validPassportsTwo]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Four '}
          <FontAwesomeIcon icon={faCandyCane} />
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

export default Four;