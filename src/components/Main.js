import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default class Main extends Component {

  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter city" name="city" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        {/* if error with getLocationData query, display notification to user */}
        {
          this.props.locationData.display_name ?
            <p>{this.props.locationData.display_name}</p>
            : <p>Search a city to find it's coordinates</p>
        }
        <p>{this.props.locationData.lat}</p>
        <p>{this.props.locationData.lon}</p>
        {this.props.locationData.lat && <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&size=600x600&zoom=12&markers=${this.props.locationData.lat},${this.props.locationData.lon}|icon:large-blue-cutout&format=png`} alt='' />}
      </div>
    );
  }
}