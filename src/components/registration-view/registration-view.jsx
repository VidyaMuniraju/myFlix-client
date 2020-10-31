import React, { useState } from  'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ EmailId, setEmailId ] = useState('');
  const [ BirthDay, setBirthDay ] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(Username, Password);
    // props.onLoggedIn(Username);
  };

  return(
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" aria-label="Username" value={Username} onChange={e => setUsername(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" aria-label="Password" value={Password} onChange={e => setPassword(e.target.value)} />
        <Form.Text classname="text-muted">
          Password should contain alphanumeric characters and must be of minimum 8 characters.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email ID</Form.Label>
        <Form.Check type="text" placeholder="EmailID" aria-label="Email ID" value={EmailId} onChange={e => setEmailId(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBirthDay">
        <Form.Label>Birth Date</Form.Label>
        <Form.Check type="text" placeholder="Date of Birth" aria-label="Date of Birth" value={BirthDay} onChange={e => setBirthDay(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleRegister}>
        Register
      </Button>

    </Form>
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

