import React, { Component } from 'react';
import { Card } from 'react-bootstrap/Card';

export default class Movies extends Component {

  render() {
    return (
      <div>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={this.props.movie.img_url} alt={this.props.movie.title} title={this.props.movie.title} />
          <Card.Body>
            <Card.Title>{this.props.movie.title}</Card.Title>
            <Card.Text>
              <p>{this.props.movie.description}</p>
              <p>Release Date:{this.props.movie.release_date}</p>
              <p>Average Rating:{this.props.movie.popularity}</p>
              <p>Total Votes:{this.props.movie.total_votes}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}



// "title": "Sleepless in Seattle",
// "overview": "A young boy who tries to set his dad up on a date after the death of his mother. He calls into a radio station to talk about his dad’s loneliness which soon leads the dad into meeting a Journalist Annie who flies to Seattle to write a story about the boy and his dad. Yet Annie ends up with more than just a story in this popular romantic comedy.",
// "average_votes": "6.60",
// "total_votes": "881",
// "image_url": "https://image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg",
// "popularity": "8.2340",
// "released_on": "1993-06-24"

// this.title = obj.title;
// this.overview = obj.overview;
// this.avg_votes = obj.average_votes;
// this.total_votes = obj.total_votes;
// this.img_url = obj.image_url;
// this.popularity = obj.popularity;
// this.release_date = obj.released_on;