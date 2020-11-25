import React from 'react';
import { getAllUserBoards, deleteBoard, deleteJoinTable } from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
    this.setLoading();
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
    });
  }

  removeBoard = (e) => {
    const deleted = this.state.boards.filter((board) => board.firebaseKey !== e.target.id);

    this.setState({
      boards: deleted,
    });

    deleteBoard(e.target.id)
      .then(() => {
        this.getBoards();
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

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} removeBoard={this.removeBoard}/>)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
          <BoardForm board={boards} onUpdate={this.getBoards}/>
            </AppModal>
          <h2>Here are all of your boards</h2>
          <div className='d-flex flex-wrap container'>{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
