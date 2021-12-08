import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';
import axios from 'axios';
import Weather from './components/Weather';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: {}
    }
  }
  // set state to cityinput
  handleSubmit = (event) => {
    event.preventDefault();
    // getLocationData as callback
    this.setState({ city: event.target.city.value }, this.getLocationData);
  }

  getLocationData = async () => {
    // query locationiq via axios
    console.log('City State: ' + this.state.city);
    let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.city}&format=json`);
    console.log(response.data[0]);
    this.setState({ locationData: response.data[0] }, this.getCityMap);
  }

  getWeatherData = async () => {

  }

  // form for user request
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Enter city" name="city" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        {this.state.locationData.display_name ?
          <p>{this.state.locationData.display_name}</p>
          : <p>Search a city to find it's coordinates</p>}
        <p>{this.state.locationData.lat}</p>
        <p>{this.state.locationData.lon}</p>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&size=600x600&zoom=14&markers=${this.state.locationData.lat},${this.state.locationData.lon}|icon:large-blue-cutout&format=png`} />
        <Weather />
      </div >
    )
  }
};