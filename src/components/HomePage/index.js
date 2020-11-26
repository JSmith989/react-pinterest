import React, { Component } from 'react';
import { getAllPins } from '../../helpers/data/pinData';
import HomePins from '../Cards/HomePins';

export default class HomePage extends Component {
  state = {
    pins: [],
  };

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    getAllPins().then((response) => {
      const pins = response;
      const showPins = Object.values(pins).filter((pin) => pin.private !== true);
      this.setState({
        pins: showPins,
      });
    });
  };

  render() {
    const { pins } = this.state;
    const showPins = () => (
      pins.map((pin) => <HomePins key={pin.firebaseKey} pin={pin} />)
    );
    return (
            <>
          <div className='d-flex flex-wrap container justify-content-center'>{showPins()}</div>
          </>
    );
  }
}
