import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import Home from './home';
import NotFound from './notFound';
import One from './1/one';
import Two from './2/two';
import Three from './3/three';
import Four from './4/four';
import Five from './5/five';
import Six from './6/six';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="danger" variant="dark">
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faSnowflake} />
          {' '}
          AOC-2020
        </Navbar.Brand>
        <Nav defaultActiveKey="/">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Days">
            <NavDropdown.Item href="/1">One</NavDropdown.Item>
            <NavDropdown.Item href="/2">Two</NavDropdown.Item>
            <NavDropdown.Item href="/3">Three</NavDropdown.Item>
            <NavDropdown.Item href="/4">Four</NavDropdown.Item>
            <NavDropdown.Item href="/5">Five</NavDropdown.Item>
            <NavDropdown.Item href="/6">Six</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Container>
        <Switch>
          <Route path="/1" component={One} />
          <Route path="/2" component={Two} />
          <Route path="/3" component={Three} />
          <Route path="/4" component={Four} />
          <Route path="/5" component={Five} />
          <Route path="/6" component={Six} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
