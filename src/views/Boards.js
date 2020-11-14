import React, { Component } from 'react';
import getBoards from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCard';

export default class Boards extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    getBoards.getBoards().then((resp) => {
      this.setState({
        boards: resp,
      });
    });
  }

  render() {
    const { boards } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} />)
    );

    return (
      <>
        <h1>All the boards</h1>
        <div className='d-flex flex-wrap container'>
          {showBoards()}
        </div>
      </>
    );
  }
}
