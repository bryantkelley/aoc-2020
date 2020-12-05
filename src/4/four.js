import { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import raw from './fourInput.txt';

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

  const validPassports = useMemo(() => passports.filter((p) => {
    if (p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid) {
      return true;
    }
    return false;
  }), [passports]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h1>Day Four</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h2>Part 1</h2>
                  </Col>
                  <Col>
                    <h3>Valid Count:</h3>
                    <div>{validPassports.length}</div>
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
      </Col >
    </Row >
  );
}

export default Four;