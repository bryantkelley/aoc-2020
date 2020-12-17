import React, { useState } from 'react';
import { Button, ButtonGroup, CardColumns, Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Home from './home';
import One from './01/one';
import Two from './02/two';
import Three from './03/three';
import Four from './04/four';
import Five from './05/five';
import Six from './06/six';
import Seven from './07/seven';
import Eight from './08/eight';
import Nine from './09/nine';
import Ten from './10/ten';
import Eleven from './11/eleven';
import Twelve from './12/twelve';
import Thirteen from './13/thirteen';
import Fourteen from './14/fourteen';
import Fifteen from './15/fifteen';
import Sixteen from './16/sixteen';
import Seventeen from './17/seventeen';
import Eighteen from './18/eighteen';
import Nineteen from './19/nineteen';
import Twenty from "./20/twenty";
import TwentyOne from "./21/twentyOne";
import TwentyTwo from "./22/twentyTwo";
import TwentyThree from "./23/twentyThree";
import TwentyFour from "./24/twentyFour";
import TwentyFive from "./25/twentyFive";


function App() {
  const days = [
    { key: 'one', component: <One /> },
    { key: 'two', component: <Two /> },
    { key: 'three', component: <Three /> },
    { key: 'four', component: <Four /> },
    { key: 'five', component: <Five /> },
    { key: 'six', component: <Six /> },
    { key: 'seven', component: <Seven /> },
    { key: 'eight', component: <Eight /> },
    { key: 'nine', component: <Nine /> },
    { key: 'ten', component: <Ten /> },
    { key: 'eleven', component: <Eleven /> },
    { key: 'twelve', component: <Twelve /> },
    { key: 'thirteen', component: <Thirteen /> },
    { key: 'fourteen', component: <Fourteen /> },
    { key: 'fifteen', component: <Fifteen /> },
    { key: 'sixteen', component: <Sixteen /> },
    { key: 'seventeen', component: <Seventeen /> },
    { key: 'eighteen', component: <Eighteen /> },
    { key: 'nineteen', component: <Nineteen /> },
    { key: 'twenty', component: <Twenty /> },
    { key: 'twentyone', component: <TwentyOne /> },
    { key: 'twentytwo', component: <TwentyTwo /> },
    { key: 'twentythree', component: <TwentyThree /> },
    { key: 'twentyfour', component: <TwentyFour /> },
    { key: 'twentyfive', component: <TwentyFive /> },
  ];

  const [day, setDay] = useState(0);
  const [all, setAll] = useState(false);

  return (
    <div>
      <Navbar expand="sm" bg="danger" variant="dark" sticky="top">
        <Navbar.Brand href="https://bryantkelley.com">
          <FontAwesomeIcon icon={faSnowflake} />
          {' '}
          Bryant Kelley
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://github.com/bryantkelley/aoc-2020">GitHub</Nav.Link>
            <Nav.Link href="https://twitter.com/_bryantkelley">Twitter</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="fixed-bottom-padding">
        <Home />
        {!all && days[day].component}
        {all && (
          <CardColumns>
            {days.map(({ key, component }) => (
              <div key={key}>
                {component}
              </div>
            ))}
          </CardColumns>
        )}
      </Container>
      <Navbar bg="danger" variant="dark" fixed="bottom">
        <ButtonGroup size="lg" className="ml-auto mr-auto">
          <Button
            variant="outline-light"
            disabled={all || day === 0}
            onClick={() => setDay(day - 1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Button
            variant={'outline-light'}
            active={all}
            onClick={() => setAll(!all)}
          >
            {all ? 'All' : day + 1}
          </Button>
          <Button
            variant="outline-light"
            disabled={all || day === days.length - 1}
            onClick={() => setDay(day + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonGroup>
      </Navbar>
    </div>
  );
}

export default App;
