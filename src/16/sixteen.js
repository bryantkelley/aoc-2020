import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import raw from './input.txt';

function Sixteen() {
  const [entries, setEntries] = useState();
  const [validTickets, setValidTickets] = useState([]);
  const [resultOne, setResultOne] = useState(''); 

  useEffect(() => {
    async function getEntries() {
      fetch(raw).then(r => r.text()).then(text => text.split('\n')).then((arr) => {
        let rules = []; // section 0
        let myTicket = []; //section 1
        let nearbyTickets = []; // section 2
        let section = 0;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === '') {
            section = section + 1;
          } else if (section === 0) {
            const [rule, rest] = arr[i].split(':');
            const [first, second] = rest.split(' or ').map(half => half.trim());
            const [firstLower, firstUpper] = first.split('-').map(value => parseInt(value, 10));
            const [secondLower, secondUpper] = second.split('-').map(value => parseInt(value, 10));
            rules.push({ rule, firstLower, firstUpper, secondLower, secondUpper });
          } else if (section === 1 && arr[i] !== 'your ticket:') {
            myTicket = arr[i].split(',').map(value => parseInt(value, 10));
          } else if (section === 2 && arr[i] !== 'nearby tickets:') {
            nearbyTickets.push(arr[i].split(',').map(value => parseInt(value, 10)));
          }
        }

        setEntries({ rules, myTicket, nearbyTickets });
      });
    }

    if (!entries) {
      getEntries();
    }
  }, [entries]);
  
  useEffect(() => {
    function getTicketsAndSum() {
      const { rules, nearbyTickets } = entries;
      
      let invalidSum = 0;
      const tickets = [];
      nearbyTickets.forEach((ticket) => {
        let failCount = 0;
        ticket.forEach((value) => {
          let valuePasses = false;
          for (let i = 0; i < rules.length; i++) {
            const { firstLower, firstUpper, secondLower, secondUpper } = rules[i];
            if ((firstLower <= value && value <= firstUpper) || (secondLower <= value && value <= secondUpper)) {
              valuePasses = true;
              break;
            }
          }
          
          if (!valuePasses) {
            invalidSum = invalidSum + value;
            failCount = failCount + 1;
          }
        });
        
        if (failCount === 0) {
          tickets.push(ticket);
        }
      });
      
      setValidTickets(tickets);
      setResultOne(invalidSum);
    }

    if (entries) {
      getTicketsAndSum();
    }
  }, [entries]);

  const resultTwo = useMemo(() => {
    if (!entries || !validTickets.length) {
      return '';
    }

    const { rules, myTicket } = entries;

    const valuesByColumn = [];
    const orderedRules = [];

    rules.forEach(() => {
      valuesByColumn.push([]);
      orderedRules.push([]);
    });

    validTickets.forEach((ticket) => {
      ticket.forEach((value, vi) => {
        valuesByColumn[vi].push(value);
      });
    })


    valuesByColumn.forEach((column, ci) => {
      rules.forEach((rule) => {
        const { firstLower, firstUpper, secondLower, secondUpper } = rule;
        let count = 0;

        if ((firstLower <= myTicket[ci] && myTicket[ci] <= firstUpper) || (secondLower <= myTicket[ci] && myTicket[ci] <= secondUpper)) {
          count = count + 1;
        }

        column.forEach((value) => {
            if ((firstLower <= value && value <= firstUpper) || (secondLower <= value && value <= secondUpper)) {
              count = count + 1;
            }
        });

        if (count === column.length + 1) {
          orderedRules[ci].push(rule.rule);
        }
      });
    });

    const correctOrder = [];

    for (let i = 0; i < orderedRules.length; i++) {
      const index = orderedRules.findIndex(or => or.length === i + 1);
      if (i === 0) {
        correctOrder[index] = orderedRules[index][0];
      } else {
        correctOrder[index] = orderedRules[index].find(r => !correctOrder.includes(r));
      }
    }

    let value = [];
    for (let i = 0; i < correctOrder.length; i++) {
      if (correctOrder[i].startsWith('departure')) {
        value.push(myTicket[i]);
      }
    }


    return value.reduce((acc, cur) => acc * cur, 1);
  }, [entries, validTickets]);

  return (
    <Card bg="danger" text="light">
      <Card.Header className="text-center">
        <h2>
          {'Day Sixteen '}
          <FontAwesomeIcon icon={faTree} />
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

export default Sixteen;
