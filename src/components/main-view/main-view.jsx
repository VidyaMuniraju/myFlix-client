import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
  constructor() {
    super();
  
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://flix-world.herokuapp.com/movies')
    .then(response => {
      // assign the result to the state
      this.setState ({
        movies: response.data
      });
    })
    .catch(function(error){
      console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  navigateBack() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    // if state isn't initialized, this will throw an error on runtime
    // before data is initially loaded
    const { movies, selectedMovie, user } = this.state;

    /*if there is no user, loginview is rendered. If there is a user logged
    in, the user details are passed as a prop to the loginview */
    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // before movies have been loaded
    if(!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        <Container>
          <Row>
            {
            selectedMovie
            ? <MovieView movie={selectedMovie} onClick= {() => this.navigateBack()}/>
            : movies.map(movie => (
            <Col md={3} key={movie._id} className="indv-card">
              <MovieCard key={movie._id} movie={movie}  onClick={movie => this.onMovieClick(movie)}/>
            </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}
