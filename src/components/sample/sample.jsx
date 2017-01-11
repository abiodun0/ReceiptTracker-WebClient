import React, { Component } from 'react';

require('./sample.scss');

export default class Sample extends Component {
  constructor() {
    super();
    this.checkTest = this.checkTest.bind(this);
    this.state = {
      testState: 'this are sample data',
    };
  }
  checkTest() {
    console.log('sample components.', this.props);
  }
  render() {
    return (
      <div>
        <p className="home">This is a sample Component</p>
        <button onClick={this.checkTest}> Test Button 1</button>
      </div>
    );
  }
}
