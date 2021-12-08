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
    await axios.get(`${process.env.url}`)
  }


  render() {
    return (
      <div>
        <h3 style={{ color: 'blue' }}>Weather Forecast</h3>
        <ul>
          {this.state.weatherData.length > 0 && this.state.weatherData.map(loc => <li>{loc}</li>)}
        </ul>
      </div>
    )
  }
}