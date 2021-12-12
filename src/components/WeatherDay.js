import React, { Component } from 'react';


export default class WeatherDay extends Component {
  render() {
    return (
      <p><li key={this.key}>{this.props.day.date}: {this.props.day.description}</li></p>
    )
  }

}
