import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCard';
import { getAllPins } from '../helpers/data/pinData';
import { getAllBoards } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';

export default class SearchResults extends Component {
  state = {
    boards: [],
    pins: [],
    results: [],
    searchTerm: '',
    searchType: '',
  };

  componentDidMount() {
    this.performSearch();
    this.getPins();
    this.getBoards();
  }

  getPins = () => {
    getAllPins().then((response) => {
      const pins = response;
      const showPins = Object.values(pins).filter((pin) => pin);
      this.setState({
        pins: showPins,
      });
    });
  };

  getBoards = () => {
    getAllBoards().then((response) => {
      const boards = response;
      const showBoards = Object.values(boards).filter((board) => board);
      this.setState({
        boards: showBoards,
      });
    });
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term;
    const searchType = this.props.match.params.type;
    const pinResults = this.state.pins.filter((pin) => pin.name.includes(searchTerm));
    const boardResults = this.state.boards.filter((board) => board.name.includes(searchTerm));
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
    {showResults()}
      </div>
    );
  }
}
