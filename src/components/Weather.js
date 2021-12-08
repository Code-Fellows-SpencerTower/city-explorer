import axios from 'axios';
import React, { Component } from 'react';

export default class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherData: []
    }
  }

  // function to make weatherData request from express server
  getWeatherData = async () => {
    const weatherDataResp = await axios.get(`${process.env.REACT_APP_URL}/weather`);
    this.setState({ weatherData: weatherDataResp.data });
    console.log(this.state.weatherData);
  }

  componentDidMount() {
    this.getWeatherData();
  }

  render() {
    return (
      <div>
        <h3 style={{ color: 'blue' }}>Weather Forecast</h3>
        <ul>
          {/* && evaluates left side, if true, evaluates right side */}
          {this.state.weatherData.length > 0 && this.state.weatherData.map(loc => <li>{loc}</li>)}
        </ul>
      </div>
    )
  }
}