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

function App() {
  return (
    <div>
      <title>Bryant's AOC 2020</title>
      <Navbar bg="danger" variant="dark">
        <Navbar.Brand href="home">
          <FontAwesomeIcon icon={faSnowflake} />
          {' '}
          AOC-2020
        </Navbar.Brand>
        <Nav defaultActiveKey="/">
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
      </Container>
    </div>
  );
}

export default App;
