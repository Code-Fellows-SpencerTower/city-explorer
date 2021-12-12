import React, { Component } from 'react';
import Movie from './Movie';
import Row from 'react-bootstrap/Row';


export default class Movies extends Component {
  render() {
    return (
      <div>
        <Row sm={1} md={2} lg={5}>
          {this.props.movieData.length > 0 && this.props.movieData.map(movie => <Movie movie={movie} />)}
        </Row>
      </div>
    );
  }
}
