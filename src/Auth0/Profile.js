import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    // You can render a loading state here
    return <div>Loading...</div>;
  }

  // Check if the user object is defined before accessing its properties
  if (!user) {
    // If the user is not authenticated, render a message or redirect to login
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          {user.picture && (
            <img
              src={user.picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          )}
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Row>
    </Container>
  );
};

export default Profile;
