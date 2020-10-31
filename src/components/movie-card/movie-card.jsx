import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import CardDeck from 'react-bootstrap/CardDeck';
import './movie-card.scss';



export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return(
      <CardDeck>
        <Card style={{ width: '18rem' }} className="movie-card mb-3">
          <Card.Img className="movie-card-poster" variant="top" src={movie.ImageURL} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Button type="Link" onClick={() => onClick(movie)} variant="link">Open</Button>
          </Card.Body>
        </Card>
      </CardDeck>
      // <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Featured: PropTypes.boolean,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

