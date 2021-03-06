import React, { Component } from 'react';
import { getAllUserPins, deletePin, deleteJoinTable } from '../helpers/data/pinData';
import { getAllUserBoards } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';

export default class Pins extends Component {
  state = {
    pins: [],
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getPins();
    this.getBoards();
    this.setLoading();
  }

  getPins = () => {
    const currentUserId = getUid();
    getAllUserPins(currentUserId).then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
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
      })
      .then(() => {
        deleteJoinTable(e.target.id);
      });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    // console.warn(this.state.boards);
    const { pins, boards, loading } = this.state;
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
        <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
          <PinForm pin={pins} boards={boards} onUpdate={this.getPins}/>
            </AppModal>
          <h2>Your Pins</h2>
          <div className='d-flex flex-wrap container justify-content-center'>{pins.map((pin) => <PinsCard key={pin.firebaseKey} pin={pin} updatePin={this.getPins} removePin={this.removePin}/>)}</div>
        </>
        )}
      </>
    );
  }
}
