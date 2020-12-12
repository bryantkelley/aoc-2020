import React, { useState, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Eleven() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n').map(line => line.split(''))).then((arr) => {
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

    let floorplan = [entries];
    let changing = true;

    while (changing) {
      let noChanges = true;
      const current = floorplan.length - 1;
      function checkNeighbors(ri, ci) {
        let occupiedCount = 0;
        // Top Left
        if (ri > 0 && ci > 0 && floorplan[current][ri - 1][ci - 1] === '#') {
          occupiedCount = occupiedCount + 1;
        }
        // Top Middle
        if (ri > 0 && floorplan[current][ri - 1][ci] === '#') {
          occupiedCount = occupiedCount + 1;
        }
        // Top Right
        if (ri > 0 && ci < floorplan[current][ri].length - 1 && floorplan[current][ri - 1][ci + 1] === '#') {
          occupiedCount = occupiedCount + 1;
        }
        // Middle Left
        if (ci > 0 && floorplan[current][ri][ci - 1] === '#') {
          occupiedCount = occupiedCount + 1;
        }
        // Middle Right
        if (ci < floorplan[current][ri].length - 1 && floorplan[current][ri][ci + 1] === '#') {
          occupiedCount = occupiedCount + 1;
        }
        // Bottom Left
        if (ri < floorplan[current].length - 1 && ci > 0 && floorplan[current][ri + 1][ci - 1] === '#') {
          occupiedCount = occupiedCount + 1;
        }
        // Bottom Middle
        if (ri < floorplan[current].length - 1 && floorplan[current][ri + 1][ci] === '#') {
          occupiedCount = occupiedCount + 1;
        }
        // Bottom Right
        if (ri < floorplan[current].length - 1 && ci < floorplan[current][ri].length - 1 && floorplan[current][ri + 1][ci + 1] === '#') {
          occupiedCount = occupiedCount + 1;
        }

        if (floorplan[current][ri][ci] === 'L' && occupiedCount === 0) {
          noChanges = false;
          return '#';
        }
        if (floorplan[current][ri][ci] === '#' && occupiedCount >= 4) {
          noChanges = false;
          return 'L';
        }
        return floorplan[current][ri][ci];
      }

      floorplan.push(floorplan[current].map((row, ri) => row.map((cell, ci) => {
        if (floorplan[current][ri][ci] === '.') {
          return '.';
        }
        return checkNeighbors(ri, ci);
      })));

      if (noChanges) {
        changing = false;
      }
    }

    let count = 0;

    floorplan[floorplan.length - 1].forEach(row => row.forEach((cell) => {
      if (cell === '#') {
        count = count + 1;
      }
    }));

    return count;
  }, [entries]);

  const resultTwo = useMemo(() => {
    if (!entries.length) {
      return '';
    }

    let floorplan = [entries];
    let changing = true;

    while (changing) {
      let noChanges = true;
      const current = floorplan.length - 1;

      // ( current row, current column, row modifier, column modifier )
      // returns 0 if 'L' or 1 if '#'
      // if '.' and next row or column is out of bounds return 0
      // else call checkNeighbor with next value
      function checkNeighbor(cri, cci, rm, cm) {
        const valueToCheck = floorplan[current][cri][cci];
        if (valueToCheck === 'L') {
          return 0;
        }
        if (valueToCheck === '#') {
          return 1;
        }

        const nextRow = cri + rm;
        const nextColumn = cci + cm;

        if (
          nextRow < 0 || floorplan[current].length <= nextRow ||
          nextColumn < 0 || floorplan[current][nextRow].length <= nextColumn
        ) {
          return 0;
        }
        
        return checkNeighbor(nextRow, nextColumn, rm, cm);
      }

      function checkNeighbors(ri, ci) {
        let occupiedCount = 0;
        // Top Left
        if (ri > 0 && ci > 0) {
          occupiedCount = occupiedCount + checkNeighbor(ri - 1, ci - 1, -1, -1);
        }
        // Top Middle
        if (ri > 0) {
          occupiedCount = occupiedCount + checkNeighbor(ri - 1, ci, -1, 0);
        }
        // Top Right
        if (ri > 0 && ci < floorplan[current][ri].length - 1) {
          occupiedCount = occupiedCount + checkNeighbor(ri - 1, ci + 1, -1, 1);
        }
        // Middle Left
        if (ci > 0) {
          occupiedCount = occupiedCount + checkNeighbor(ri, ci - 1, 0, -1);
        }
        // Middle Right
        if (ci < floorplan[current][ri].length - 1) {
          occupiedCount = occupiedCount + checkNeighbor(ri, ci + 1, 0, 1);
        }
        // Bottom Left
        if (ri < floorplan[current].length - 1 && ci > 0) {
          occupiedCount = occupiedCount + checkNeighbor(ri + 1, ci - 1, 1, -1);
        }
        // Bottom Middle
        if (ri < floorplan[current].length - 1) {
          occupiedCount = occupiedCount + checkNeighbor(ri + 1, ci, 1, 0);
        }
        // Bottom Right
        if (ri < floorplan[current].length - 1 && ci < floorplan[current][ri].length - 1) {
          occupiedCount = occupiedCount + checkNeighbor(ri + 1, ci + 1, 1, 1);
        }

        if (floorplan[current][ri][ci] === 'L' && occupiedCount === 0) {
          noChanges = false;
          return '#';
        }
        if (floorplan[current][ri][ci] === '#' && occupiedCount >= 5) {
          noChanges = false;
          return 'L';
        }
        return floorplan[current][ri][ci];
      }

      floorplan.push(floorplan[current].map((row, ri) => row.map((cell, ci) => {
        if (floorplan[current][ri][ci] === '.') {
          return '.';
        }
        return checkNeighbors(ri, ci);
      })));

      if (noChanges) {
        changing = false;
      }
    }

    let count = 0;

    floorplan[floorplan.length - 1].forEach(row => row.forEach((cell) => {
      if (cell === '#') {
        count = count + 1;
      }
    }));

    return count;
  }, [entries]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2>Day Eleven</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 1</h3>
          </Col>
          <Col>
            <h4>Estimated Available Seats</h4>
            <h5>{resultOne}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faGift} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Part 2</h3>
          </Col>
          <Col>
            <h4>Actual Available Seats</h4>
            <h5>{resultTwo}</h5>
          </Col>
          <Col>
            <h4>
              <FontAwesomeIcon icon={faGlassCheers} />
            </h4>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Eleven;
