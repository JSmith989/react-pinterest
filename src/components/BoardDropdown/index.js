import React, { Component } from 'react';
import getUid from '../../helpers/data/authData';
import { getAllUserBoards } from '../../helpers/data/boardData';

export default class BoardDropdown extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      });
    });
  }

  render() {
    const { boards } = this.state;
    const displayBoards = () => (
      boards.map((board) => <option key={board.firebaseKey} value={board.firebaseKey}>{board.name}</option>)
    );
    return (
        <div class="form-group">
        <select class="form-control"
        id="boardId"
        ref={this.props.boardRef}
        onChange={this.props.onChange}>
          <option value=''>Choose Board</option>
          {displayBoards()}
        </select>
    </div>
    );
  }
}
