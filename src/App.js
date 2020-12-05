import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import Home from './home';
import NotFound from './notFound';
import One from './1/one';
import Two from './2/two';

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faSleigh} />
          {' '}
          AOC-2020
        </Navbar.Brand>
        <Nav defaultActiveKey="/">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Days">
            <NavDropdown.Item href="/1">One</NavDropdown.Item>
            <NavDropdown.Item href="/2">Two</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Container>
        <Switch>
          <Route path="/1" component={One} />
          <Route path="/2" component={Two} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
