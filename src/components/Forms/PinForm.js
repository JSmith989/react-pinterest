import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { createPin, updatePin, joinPinToBoard } from '../../helpers/data/pinData';
import getUser from '../../helpers/data/authData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.pin?.userId || '',
    description: this.props.pin?.description || '',
    private: false,
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
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.firebaseKey === '') {
      createPin(this.state)
        .then((response) => {
          const joinTableObject = {
            boardId: this.props.board.firebaseKey,
            pinId: response.data.firebaseKey,
            userId: this.state.userId,
          };
          joinPinToBoard(joinTableObject).then(() => this.props.onUpdate(this.props.board.firebaseKey));
        });
    } else {
      updatePin(this.state)
        .then(() => {
          this.props.onUpdate(this.props.pin.firebaseKey);
        });
    }
  }

  changeStatus = () => {
    this.setState({
      private: !this.state.private,
    });
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <h1>Pins form</h1>
        <div class="form-check form-check-inline">
          <label class="form-check-label" for="inlineCheckbox1">Make Pin Private</label>
        <input
          class="form-check-input"
          id="inlineCheckbox1"
          type='checkbox'
          name='status'
          onChange={this.changeStatus}
          className='form-control form-control-sm m-1'
        />
        </div>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Pin Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Pin description'
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
