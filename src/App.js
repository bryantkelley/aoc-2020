import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
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

function App() {
  return (
    <div>
      <Navbar bg="danger" variant="dark" sticky="top">
        <Navbar.Brand href="https://bryantkelley.com">
          <FontAwesomeIcon icon={faSnowflake} />
          {' '}
          Bryant Kelley
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="https://github.com/bryantkelley/aoc-2020">GitHub</Nav.Link>
          <Nav.Link href="https://twitter.com/_bryantkelley">Twitter</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Home />
        <One />
        <Two />
        <Three />
        <Four />
        <Five />
        <Six />
        <Seven />
        <Eight />
        <Nine />
        <Ten />
        <Eleven />
        <Twelve />
        <Thirteen />
      </Container>
    </div>
  );
}

export default App;
