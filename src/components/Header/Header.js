import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SUST Portal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Resources</Nav.Link>
            <Nav.Link href="#features">Culture of SUST</Nav.Link>
            <Nav.Link href="#pricing">About</Nav.Link>
          </Nav>
          <Nav className="d-flex">
            <Nav.Link href="#features">Sign Up</Nav.Link>
            <Nav.Link href="#pricing">Log In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
