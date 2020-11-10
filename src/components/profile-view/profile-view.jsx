import React from  'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Username: null,
      Password: null,
      EmailId: null,
      BirthDay: null,
      FavoriteMovies: [],
      movies: []
    };
  }

  getUser(token) {
    axios.get(`https://flix-world.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      this.setState({
        Username: res.data.Username,
        Pasword: res.data.Password,
        Email: res.data.Email,
        BirthDay: res.data.BirthDay,
        FavoriteMovies: res.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  updateUser(Username, Password, EmailId, BirthDay) {
    const token = localStorage.getItem('token');
    axios.put(`https://flix-world.herokuapp.com/users/${localStorage.getItem('user')}`,{
      Username: Username,
      Password: Password,
      EmailId: EmailId,
      BirthDay: BirthDay
    }, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const data = response;
      console.log(data);
      localStorage.setItem('user', data.Username);
      alert(Username + ' has been updated');
      window.open(`/users/${localStorage.getItem('user')}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deregisterUser(Username) {
    const token = localStorage.getItem('token');
    axios.delete(`https://flix-world.herokuapp.com/users/${localStorage.getItem('user')}`, { headers: { Authorization: `Bearer ${token}` }})
    .then(() => {
      alert(Username + ' has been deleted');
      this.onLogOut();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeFav(movie) {
    const token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    
    axios.delete(`https://flix-world.herokuapp.com/users/${user}/movies/${movie._id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      const data = res;
      console.log(data);
      this.componentDidMount();
      // localStorage.removeItem('favoritemovies[movie]');
      // window.open(`/users/${localStorage.getItem('user')}`, '_self');
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {
    const {  movies } = this.props;
    // let { user } = this.state;

    // const { Username, Password, EmailId, BirthDay } = user;

    if(this.state.FavoriteMovies === undefined){
      return (
        <div className="profile-view">Loading..</div>
      )
    }
   
    let favMovie = [];

    for(let i=0; i < this.state.FavoriteMovies.length; i++) {
      let fm = movies.find(m => {
        return (m._id === this.state.FavoriteMovies[i]);
      });
      favMovie.push(fm);
    }

    return(
      <Container>
        <h2>Update your information:</h2>
       
        <Form className="profile-view">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" aria-label="Username"  onChange={(e) => {this.setState(
            {Username: e.target.value})
            if(! e.target.value){
              // console.log(e.target.value);
              this.setState({Username: Username})
            }
          }}/>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" aria-label="Password"  onChange={(e) => {this.setState({
            Password: e.target.value})
            if(! e.target.value){
              this.setState({Password: Password})
            }
            }} />
          <Form.Text className="text-muted">
          Password should contain alphanumeric characters and must be of minimum 8 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email ID</Form.Label>
          <Form.Check type="text" placeholder="EmailID" aria-label="Email ID"  onChange={(e) => {this.setState({
            EmailId: e.target.value})
            if(! e.target.value){
              this.setState({EmailId: EmailId})
            }
            }}/>
        </Form.Group>

        <Form.Group controlId="formBirthDay">
          <Form.Label>Birth Date</Form.Label>
          <Form.Check type="text" placeholder="Date of Birth" aria-label="Date of Birth"  onChange={(e) => {this.setState({
            BirthDay: e.target.value})
            if(! e.target.value){
              this.setState({BirthDay: BirthDay})
            }
            }} />
        </Form.Group>

        <Button className="update-button" variant="outline-dark" type="submit" onClick={e => {
          e.preventDefault();
          this.updateUser(
            this.state.Username,
            this.state.Password,
            this.state.EmailId,
            this.state.BirthDay
          );
        }}>
            Update user info
        </Button>

        <Button className="log-out" variant="outline-dark" type="submit" onClick={() => this.onLogOut()}>
          Log out
        </Button>

        </Form>

        <Button className="delete-button" variant="outline-dark" type="submit" onClick={e => {
          e.preventDefault();
          this.deregisterUser(Username);
        }}>
          Delete account
        </Button>
        
        <h3 className="fav-text">Your Favorite Movies</h3>
        <Row>
          {favMovie.map(m => (
            <Col md={4} key={m._id} className="fav-card">
              <MovieCard key={m._id} movie={m} />
              <Button className="remove-fav" variant="outline-dark" type="submit" onClick={() => this.removeFav(m)}>
                Delete movie
              </Button>
            </Col>
          ))}
        </Row>

      </Container>
      
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    EmailId: PropTypes.string,
    BirthDay: PropTypes.string,
    FavoriteMovies: PropTypes.array
  })
  // movies: PropTypes.shape({
  //   Title: PropTypes.string,
  //   Description: PropTypes.string.isRequired,
  //   ImageURL: PropTypes.string.isRequired,
  //   Featured: PropTypes.boolean,
  //   Genre: PropTypes.shape({
  //     Name: PropTypes.string.isRequired,
  //     Description: PropTypes.string.isRequired
  //   }),
  //   Director: PropTypes.shape({
  //     Name: PropTypes.string.isRequired,
  //     Bio: PropTypes.string.isRequired,
  //     Birth: PropTypes.string.isRequired,
  //     Death: PropTypes.string
  //   })
  // })
}