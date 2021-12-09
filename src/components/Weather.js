import React, { Component } from 'react';

export default class Weather extends Component {

  render() {
    return (
      <div>
        <h3 style={{ color: 'blue' }}>Weather Forecast</h3>
        <ul>
          {/* && evaluates left side, if true, evaluates right side */}
          {this.props.weatherData.map(loc => <li>{loc.date}: {loc.description}</li>)}
        </ul>
      </div>
    )
  }
}