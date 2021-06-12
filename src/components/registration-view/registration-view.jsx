import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';

import './registration-view.scss';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [EmailId, setEmailId] = useState('');
  const [BirthDay, setBirthDay] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('https://flix-world.herokuapp.com/users', {
      Username: Username,
      Password: Password,
      EmailId: EmailId,
      BirthDay: BirthDay
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user');
      });
  };

  return (
    <div className="registration-view">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" aria-label="Username" value={Username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" aria-label="Password" value={Password} onChange={e => setPassword(e.target.value)} />
          <Form.Text className="text-muted">
            Password should contain alphanumeric characters and must be of minimum 8 characters.
        </Form.Text>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email ID</Form.Label>
          <Form.Check type="text" aria-label="Email ID" value={EmailId} onChange={e => setEmailId(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBirthDay">
          <Form.Label>Birth Date</Form.Label>
          <Form.Check type="text" placeholder="YYYY/MM/DD" aria-label="Date of Birth" value={BirthDay} onChange={e => setBirthDay(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleRegister}>
          Register
      </Button>

      </Form>
      <Container className="mt-4">
        <Row className="d-flex align-items-center justify-content-center">
          <span>Already have an account? </span>
          <Link to={`/`}>
            <Button variant="primary" className="login-link">Login</Button>
          </Link>
        </Row>
      </Container>
    </div>
  );

}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    EmailId: PropTypes.string.isRequired,
    BirthDay: PropTypes.instanceOf(Date).isRequired
  })
};

