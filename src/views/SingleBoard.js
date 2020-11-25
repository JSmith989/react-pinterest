import React from 'react';
import {
  getBoardPins,
  getPin,
} from '../helpers/data/pinData';
import { getSingleBoard } from '../helpers/data/boardData';
import HomePins from '../components/Cards/HomePins';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    // 0. Make a call to the API that gets the board info
    const boardId = this.props.match.params.id;
    this.getBoardInfo(boardId);

    // 1. Make a call to the API that returns the pins associated with this board and set to state.
    this.getPins(boardId)
    // because we did a promise.all, the response will not resolve until all the promises are completed
      .then((resp) => (
        this.setState({ pins: resp })
      ));
  }

  getBoardInfo = (boardId) => {
    getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      // an array that holds all of the calls to get the pin information
      const pinArray = [];
      response.forEach((item) => {
        // pushing a function that returns a promise into the pinArray
        pinArray.push(getPin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all([...pinArray]);
    })
  )

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (
         <HomePins key={pin.firebaseKey} pin={pin} />
      ))
    );

    // 3. Render the pins on the DOM
    return (
      <div>
        <h1>{board.name}</h1>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
        { Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
        </AppModal>
        <div className='d-flex flex-wrap container'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
