import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Auth0/Buttons/login-button';
import LogoutButton from '../Auth0/Buttons/logout-button';

const MainNav = () => (
  <Nav className="mr-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/profile"
      exact
      activeClassName="router-link-exact-active"
      style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}
    >
      Profile
    </Nav.Link>
  </Nav>
);

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Nav className="justify-content-end">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav>
  );
};

const NavBar = () => {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={RouterNavLink} className="logo" to="/">
          {/* Your Brand Logo */}
        </Navbar.Brand>
        <MainNav />
        <AuthNav />
      </Container>
    </Navbar>
  );
};

export default NavBar;
