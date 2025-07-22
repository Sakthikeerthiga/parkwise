import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold">
        <img src={process.env.PUBLIC_URL + '/parkwise-logo.png'} alt="ParkWise Logo" style={{ height: '51px', width: '122px', marginRight: '10px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/all-parking" className="fw-semibold mx-2">FIND PARKING</Nav.Link>
            <Nav.Link as={Link} to="#" className="fw-semibold mx-2">ABOUT</Nav.Link>
            <Button as={Link} to="#" className="px-4 fw-semibold mx-2" variant="primary">LOGIN</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header; 