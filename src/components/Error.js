import React, { Component } from 'react';

export default class Error extends Component {

  render() {
    return (
      <div>
        <h3 style={{ color: 'red' }}>Error: 404 Not Found</h3>
        <p style={{ color: 'red' }}>{`There was an error with your request for ${this.props.city}`}</p>
      </div>
    )
  }
}