import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Weather from './components/Weather';
import Main from './components/Main';
import Error from './components/Error';
import Movies from './components/Movies';
import Row from 'react-bootstrap/Row';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: {},
      weatherData: [],
      error: false,
      movieData: []
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
      this.setState({ locationData: response.data[0] }, this.getAllData);

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

  getWeatherData = async (city_name) => {
    try {
      const weatherDataRes = await axios.get(`${process.env.REACT_APP_URL}/weather?city_name=${city_name}&lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}`);
      this.setState({ weatherData: weatherDataRes.data });
      this.setState({ error: false });
    } catch (error) {
      this.setState({ error: true });
      this.setState({ locationData: {} });
      this.setState({ weatherData: [] });

    }
  }

  getMovieData = async (city_name) => {
    try {
      const movieRes = await axios.get(`${process.env.REACT_APP_URL}/movies?city_name=${city_name}`);
      this.setState({ movieData: movieRes.data });
      console.log(this.state.movieData);
      this.setState({ error: false });
    } catch (error) {
      this.setState({ error: true })
      this.setState({ locationData: {} });
      this.setState({ weatherData: [] });
    }
  }

  getAllData = () => {
    // runs every re-render, get live weather if lat and lon exist in state
    if (this.state.locationData.lat && this.state.locationData.lon) {
      const city_name = this.state.locationData.display_name.split(',')[0];
      this.getWeatherData(city_name);
      this.getMovieData(city_name);
    }
  }


  // form for user request
  render() {
    return (
      <div>
        <Main locationData={this.state.locationData} handleSubmit={this.handleSubmit} />
        {this.state.error && <Error city={this.state.city} />}
        {/* if data in weatherData, send props into  */}
        {this.state.weatherData.length > 0 && <Weather weatherData={this.state.weatherData} error={this.state.error} />}
        {/* map movies into Movies component to render */}
        <Row sm={1} md={2} lg={5}>
          {console.log('Movie Data:', this.state.movieData)}
          {this.state.movieData.length > 0 && this.state.movieData.map(movie => <Movies movie={movie} />)}
        </Row>
      </div >
    )
  }
};