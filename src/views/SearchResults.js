import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCard';
import PinsCard from '../components/Cards/PinsCard';
import { getAllUserBoards } from '../helpers/data/boardData';
import { getAllUserPins } from '../helpers/data/pinData';
import getUid from '../helpers/data/authData';

export default class SearchResults extends Component {
  state = {
    boards: [],
    pins: [],
    results: [],
    searchTerm: '',
    searchType: '',
  };

  componentDidMount() {
    this.getBoards();
    this.performSearch();
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      });
    });
  }

  getPins = () => {
    const currentUserId = getUid();
    getAllUserPins(currentUserId).then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term;
    const searchType = this.props.match.params.type;
    const boardResults = this.state.boards.filter((board) => board.name === searchTerm);
    const pinResults = this.state.pins.filter((pin) => pin.name === searchTerm);
    if (searchType === 'boards') {
      // Make an api call that gets the boards with the search term .filter on all the boards

      this.setState({
        results: boardResults,
        searchTerm,
        searchType,
      });
    } else {
      // Make an api call that gets the pins with the search term .filter on all the boards
      this.setState({
        results: pinResults,
        searchTerm,
        searchType,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.getBoards();
      this.getPins();
      this.performSearch();
    }
  }

  render() {
    const { results, searchType } = this.state;
    const showResults = () => results.map((result) => (searchType === 'boards' ? (
          <BoardsCard key={result.firebaseKey} board={result} />
    ) : (
          <PinsCard key={result.firebaseKey} pin={result} />
    )));
    return (
      <div>
        <h2>Search Results</h2>
    {this.state.results.length > 0 ? showResults() : null }
      </div>
    );
  }
}
