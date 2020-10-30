import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view'

export class MainView extends React.Component {
  constructor() {
    super();
  
    this.state = {
      movies: null,
      selectedMovie: null
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

  render() {
    // if state isn't initialized, this will throw an error on runtime
    // before data is initially loaded
    const { movies, selectedMovie } = this.state;

    // before movies have been loaded
    if(!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        {
          selectedMovie
          ? <MovieView movie={selectedMovie} onClick= {() => this.navigateBack()}/>
          : movies.map(movie => ( 
          <MovieCard key={movie._id} movie={movie}  onClick={movie => this.onMovieClick(movie)}/>
        ))}
      </div>
    );
  }
}
