import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { createBoard, updateBoard } from '../../helpers/data/boardData';

export default class BoardForm extends Component {
  state = {
    firebaseKey: this.props.board?.firebaseKey || '',
    name: this.props.board?.name || '',
    imageUrl: this.props.board?.imageUrl || '',
    userId: this.props.board?.userId || '',
    description: this.props.board?.description || '',
    successAlert: false,
  };

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);

      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.firebaseKey === '') {
      createBoard(this.state)
        .then(() => {
          this.props.onUpdate();
          this.setState({ successAlert: true });
        });
    } else {
      updateBoard(this.state)
        .then(() => {
          this.props.onUpdate(this.state.firebaseKey);
          this.setState({ successAlert: true });
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        { this.state.successAlert && (<div className="alert alert-success m-2" role="alert">Success! You did it! <i className="far fa-smile fa-sm"></i></div>)}
        <h1>boards form</h1>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Board Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Board description'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}
