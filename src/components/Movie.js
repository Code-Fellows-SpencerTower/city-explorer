import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class Movies extends Component {

  render() {
    return (
      <>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={this.props.movie.img_url} alt={this.props.movie.title} title={this.props.movie.title} />
          <Card.Body>
            <Card.Title>{this.props.movie.title}</Card.Title>
            <Card.Text>
              <p>{this.props.movie.overview}</p>
              <p>Release Date: {this.props.movie.release_date}</p>
              <p>Average Rating: {this.props.movie.popularity}</p>
              <p>Total Votes: {this.props.movie.total_votes}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }
}
