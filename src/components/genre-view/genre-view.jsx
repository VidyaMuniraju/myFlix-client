import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if(! (genre.Name) ) return null;

    return(

      <div className="genre-info">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>

        <div className="genre-desc">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
    
        <Button className="back-btn" onClick={() => window.history.back()}>
          Back
        </Button>
      
      </div>
    )
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};