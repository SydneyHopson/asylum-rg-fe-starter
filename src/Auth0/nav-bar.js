// Import necessary libraries and components
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Auth0/Buttons/login-button';
import LogoutButton from '../Auth0/Buttons/logout-button';

// MainNav component displays the "Profile" link in the navigation menu if the user is logged in.
const MainNav = ({ isAuthenticated }) => {
  // Check if the user is not authenticated (not logged in).
  if (!isAuthenticated) {
    // If the user is not logged in, return null to hide the "Profile" link.
    return null;
  }

  // If the user is logged in, render the "Profile" link in the navigation menu.
  return (
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
};

// AuthNav component displays the login or logout button based on the user's authentication status.
const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Nav className="justify-content-end">
      {/* If the user is authenticated, display the logout button; otherwise, display the login button. */}
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav>
  );
};

// NavBar component represents the main navigation bar.
const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={RouterNavLink} className="logo" to="/">
          {/* Your Brand Logo (you can add your brand logo here if you have one) */}
        </Navbar.Brand>
        {/* Conditionally render the MainNav component based on the user's authentication status. */}
        {isAuthenticated && <MainNav isAuthenticated={isAuthenticated} />}
        {/* Display the AuthNav component, which shows the login or logout button. */}
        <AuthNav />
      </Container>
    </Navbar>
  );
};

export default NavBar;
