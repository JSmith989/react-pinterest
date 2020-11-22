import React, { Component } from 'react';
import { getAllPins } from '../../helpers/data/pinData';
import Loader from '../Loader';
import HomePins from '../Cards/HomePins';

export default class HomePage extends Component {
  state = {
    pins: [],
    loading: true,
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
      }, this.setLoading);
    });
  };

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { pins, loading } = this.state;
    const showPins = () => (
      pins.map((pin) => <HomePins key={pin.firebaseKey} pin={pin} />)
    );
    return (
        <>
        { loading ? (
            <Loader />
        ) : (
            <>
          <div className='d-flex flex-wrap container'>{showPins()}</div>
          </>
        )}
      </>
    );
  }
}
