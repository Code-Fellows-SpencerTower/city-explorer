import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';
import axios from 'axios';
import Weather from './components/Weather';
import Error from './components/Error';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: {},
      weatherData: [],
      error: false
    }
  }
  // set state to cityinput
  handleSubmit = (event) => {
    event.preventDefault();
    // getLocationData as callback
    this.setState({ city: event.target.city.value }, this.getLocationData);
  }

  getLocationData = async () => {
    try {
      // query locationiq via axios
      console.log('City state: ' + this.state.city);
      let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.city}&format=json`);
      console.log(response.data[0]);
      // this.getWeatherData(this.state.city);
      this.setState({ locationData: response.data[0] });
      this.setState({ error: false });
    } catch (error) {
      console.log('There was an error with your request.');
      // error set to true
      this.setState({ error: true });
      // reset state to clear any previously rendered queries
      this.setState({ locationData: {} });
      this.setState({ weatherData: [] });
    }
  }

  getWeatherData = async () => {
    const weatherDataResp = await axios.get(`${process.env.REACT_APP_URL}/weather?city_name=${this.state.locationData.city_name}&lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}`);
    this.setState({ weatherData: weatherDataResp.data });
  }

  componentDidUpdate() {
    // runs every re-render, get live weather if lat and lon exist in state
    if (this.state.locationData.lat && this.state.locationData.lon) {
      this.getWeatherData();
    }
  }

  // form for user request
  render() {
    console.log(this.state.weatherData);
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter city" name="city" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        {/* if error with getLocationData query, display notification to user */}
        {this.state.locationData.display_name ?
          <p>{this.state.locationData.display_name}</p>
          : <p>Search a city to find it's coordinates</p>}
        {this.state.error && <Error city={this.state.city} />}
        <p>{this.state.locationData.lat}</p>
        <p>{this.state.locationData.lon}</p>
        {this.state.locationData.lat && <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&size=600x600&zoom=14&markers=${this.state.locationData.lat},${this.state.locationData.lon}|icon:large-blue-cutout&format=png`} alt='' />}
        {/* if data in weatherData, send props into  */}
        {this.state.weatherData.length > 0 && <Weather weatherData={this.state.weatherData} />}
      </div >
    )
  }
};