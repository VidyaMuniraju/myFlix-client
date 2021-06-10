import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(Username, Password);
    // send a req to the server for auth then call props.onLoggedIn(username)
    axios.post('https://flix-world.herokuapp.com/login', {
      Username: Username,
      Password: Password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
      });
    // props.onLoggedIn(user);
  };

  return (
    <div className="login-view">
      <Container className="container-fluid">
        <Form className="login-view">
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" aria-label="Username" value={Username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="text" aria-label="Password" value={Password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </Container>
      <Container className="container-fluid">
        <Row className="d-flex align-items-center justify-content-center">
          <span>Don't have an account?</span>
          <Link to={`/register`}>
            <Button variant="primary" className="signUp-link" type="submit">Sign up</Button>
          </Link>
        </Row>
      </Container>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};