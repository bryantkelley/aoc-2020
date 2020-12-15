import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Seven() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then((arr) => {
        return arr.map(row => row.split(' contain '));
      }).then((arr) => {
        return arr.map((row) => {
          const bag = row[0].substr(0, row[0].length - 5);
          const rules = row[1].substr(0, row[1].length - 1).split(', ').map((item) => {
            const [count, colorOne, colorTwo] = item.split(' ');
            return {
              count,
              color: colorOne + ' ' + colorTwo,
            };
          }).filter((rule) => rule.count !== 'no');
          return {
            color: bag,
            rules,
            inside: [],
          };
        });
      }).then((arr) => {
        const temp = arr.map((item) => {
          const newItem = { ...item };
          arr.forEach((row) => row.rules.forEach((rule) => {
            if (rule.color === item.color) {
              newItem.inside.push(row.color);
            }
          }));
          return newItem;
        });
        return temp;
      }).then(arr => setEntries(arr));
    }

    if (!entries.length) {
      getEntries();
    }
  }, [entries]);

  const [totalBags, setTotalBags] = useState([]);
  useEffect(() => {
    function getBags() {
      let bagsOfHolding = [...totalBags];
      let targetBags = ['shiny gold', ...totalBags];
      entries.filter(entry => !bagsOfHolding.includes(entry.color)).forEach((entry) => {
        if (entry.rules.find((rule) => {
          if (targetBags.find((target) => {
            if (target === rule.color) {
              return true;
            }
            return false;
          })) {
            return true;
          }
          return false;
        })) {
          bagsOfHolding.push(entry.color);
        }
      });

      if (bagsOfHolding.length !== totalBags.length) {
        setTotalBags(bagsOfHolding);
      }
    }

    if (entries.length) {
      getBags();
    }
  }, [entries, totalBags]);

  const insideBags = useMemo(() => {
    if (entries.length) {
      function findInsideBags(bag) {
        let count = 0;
        if (bag.rules.length) {
          bag.rules.forEach((rule) => {
            count = count + rule.count * findInsideBags(entries.find(entry => entry.color === rule.color));
          });
        }
        count = count + 1;
        return count;
      }

      const shinyGoldBag = entries.find(entry => entry.color === 'shiny gold');
      return findInsideBags(shinyGoldBag) - 1;
    }
    return 0;
  }, [entries]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Seven '}
          <FontAwesomeIcon icon={faGift} />
        </h2>
      </Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 1</h3>
            </Col>
            <Col>
              <h4>{totalBags.length}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item variant="danger">
          <Row>
            <Col>
              <h3>Part 2</h3>
            </Col>
            <Col>
              <h4>{insideBags}</h4>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default Seven;
