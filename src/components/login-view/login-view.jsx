import React, { useState } from  'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password);
    // send a req to the server for auth then call props.onLoggedIn(username)
    props.onLoggedIn(Username);
  };

  return(
    <Form className="login-view">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" aria-label="Username" value={Username} onChange={e => setUsername(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="text" aria-label="Password" value={Password} onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
      Submit
      </Button>
    </Form>

    // <form>
    //   <label>
    //     Username:
    //     <input type="text" value={Username} onChange={e => setUsername(e.target.value)}/>
    //   </label>

    //   <label>
    //     Password:
    //     <input type="text" value={Password} onChange={e => setPassword(e.target.value)}/>
    //   </label>
    //   <button type="button" onClick={handleSubmit}>Submit</button>
    // </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};