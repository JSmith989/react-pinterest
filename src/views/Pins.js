import React, { Component } from 'react';
import { getAllUserPins, deletePin } from '../helpers/data/pinData';
import PinsCard from '../components/Cards/PinsCard';
import getUid from '../helpers/data/authData';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';

export default class Pins extends Component {
  state = {
    pins: [],
  }

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const currentUserId = getUid();
    getAllUserPins(currentUserId).then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  removePin = (e) => {
    const deleted = this.state.pins.filter((pin) => pin.firebaseKey !== e.target.id);

    this.setState({
      pins: deleted,
    });

    deletePin(e.target.id)
      .then(() => {
        this.getPins();
      });
  }

  render() {
    const { pins } = this.state;
    return (
        <>
        <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
          <PinForm pin={pins} onUpdate={this.getPins}/>
            </AppModal>
          <h2>Here are all of your pins</h2>
          <div className='d-flex flex-wrap container'>{pins.map((pin) => <PinsCard key={pin.firebaseKey} pin={pin} updatePin={this.getPins} removePin={this.removePin}/>)}</div>
        </>
    );
  }
}
