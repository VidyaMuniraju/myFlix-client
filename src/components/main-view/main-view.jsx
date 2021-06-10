import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RouterLink } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ProfileView } from '../profile-view/profile-view';
import { Button } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      // movies: [],
      // selectedMovie: null,
      user: null,
      favoritemovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken != null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      // this.getUser(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData)
    this.setState({
      user: authData.user,
      favoritemovies: authData.user.FavoriteMovies
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('favoritemovies', authData.user.FavoriteMovies);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://flix-world.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
        // this.setState({
        //   movies: response.data
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favoritemovies');
    window.open('/', '_self');
  }

  render() {
    // if state isn't initialized, this will throw an error on runtime
    // before data is initially loaded
    let { movies } = this.props;
    let { user } = this.state;

    /* if there is no user, loginview is rendered. If there is a user logged
    in, the user details are passed as a prop to the loginview */


    // new version
    if (!user) {
      return (
        <Router>
          <div className="main-view">
            <div className="d-flex bg-light shadow-sm p-3 mb-5">
              <h1>MyFlix</h1>
            </div>

            <Container className="container-fluid">
              <Row className="justify-content-center">
                <Col xs={12} sm={8} md={8}>
                  <Route exact path="/" render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} />} />
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col xs={12} sm={8} md={8}>
                  <Route exact path="/register" render={() => {
                    if (user) return <Redirect to="/" />
                    return <RegistrationView />
                  }} />
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">MyFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to={`users/${user}`}>My Account</Nav.Link>
              </Nav>
              <Button variant="outline-dark" type="submit" className="logOut-btn" onClick={this.onLogOut}>LogOut</Button>
            </Navbar.Collapse>
          </Navbar>

          <div className="main-view">
            <Container className="container-fluid">
              <Row>
                <Route exact path="/" render={() => <MoviesList movies={movies} />} />

                <Route exact path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

                <Route exact path="/directors/:name" render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                }} />

                <Route exact path="/genres/:name" render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                }} />

                <Route exact path="/users/:Username" render={() => {
                  return <ProfileView movies={movies} />;
                }} />
              </Row>
            </Container>
          </div>
        </Router>
      );
    }
  }
}

// mapStateToProps - a function which, if defined, will allow the component to subscribe to store updates
let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);