import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import Home from './home';

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
          {/* <NavDropdown title="Days">
            <NavDropdown.Item href="/1">One</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      </Navbar>
      <Container>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
