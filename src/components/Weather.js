import React, { Component } from 'react';
import WeatherDay from './WeatherDay';


export default class Weather extends Component {

  render() {
    return (
      <div>
        <h3 style={{ color: 'blue' }}>Weather Forecast</h3>
        <ul>
          {/* && evaluates left side, if true, evaluates right side */}
          {this.props.weatherData.map((day, idx) => <WeatherDay key={idx} day={day} />)}
        </ul>
      </div>
    )
  }
}