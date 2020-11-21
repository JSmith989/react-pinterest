import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import MyNavbar from '../components/MyNavbar';
import Routes from '../helpers/Routes';
import { getAllBoards } from '../helpers/data/boardData';
import { getAllPins } from '../helpers/data/pinData';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
    pins: [],
    boards: [],
  };

  componentDidMount() {
    this.getPins();
    this.getBoards();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  getBoards = () => {
    getAllBoards().then((response) => {
      this.setState({
        boards: response,
      });
    });
  }

  getPins = () => {
    getAllPins().then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user, pins, boards } = this.state;
    return (
      <div className='App'>
        <Router>
          <MyNavbar user={user}/>
          <Routes user={user} pins={pins} boards={boards} />
        </Router>
      </div>
    );
  }
}

export default App;
