import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import Home from './home';
import One from './1/one';
import Two from './2/two';
import Three from './3/three';
import Four from './4/four';
import Five from './5/five';
import Six from './6/six';
import Seven from './7/seven';

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
      </Container>
    </div>
  );
}

export default App;
