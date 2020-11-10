import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {
  constructor() {
    super();
  
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null,
      favoritemovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if(accessToken != null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      // this.getUser(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
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
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }


  render() {
    // if state isn't initialized, this will throw an error on runtime
    // before data is initially loaded
    let { movies, user } = this.state;

    /*if there is no user, loginview is rendered. If there is a user logged
    in, the user details are passed as a prop to the loginview */
    

    // before movies have been loaded
    if(!movies) return <div className="main-view"/>;

    // if(!favoritemovies) return (<div className="main-view"/>);

    return (
      <Router>
        <div className="main-view">

          <Container className="cards">
            <Row>
              <Route exact path="/" render={() =>{
                if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return movies.map(m => (
                  <Col md={3} key={m._id} className="indv-card">
                    <MovieCard key={m._id} movie={m}/> 
                  </Col>
                ))}}/>
            </Row>
          </Container>
                
          <Route exact path="/register" render={() => <RegistrationView /> }  />

          <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

          <Route exact path="/directors/:name" render={({ match }) => {
            if(!movies) return <div className="main-view"/>;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>
          }} />

          <Route exact path="/genres/:name" render={({ match }) => {
            if(!movies) return <div className="main-view"/>;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
          }} />


          <Route exact path="/users/:Username" render={( ) =>  {
            return <ProfileView movies={movies} />;  } }/>

        </div>
      </Router>
    );
  }
}