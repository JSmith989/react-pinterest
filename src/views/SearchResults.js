import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCard';
import PinsCard from '../components/Cards/PinsCard';
import { getAllUserBoards } from '../helpers/data/boardData';
import getUid from '../helpers/data/authData';

export default class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: '',
    boards: [],
  };

  componentDidMount() {
    this.performSearch();
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

  performSearch = () => {
    const searchTerm = this.props.match.params.term;
    const searchType = this.props.match.params.type;
    if (searchType === 'boards') {
      // Make an api call that gets the boards with the search term .filter on all the boards
      this.state.boards.filter((board) => board.name === searchTerm);
      console.warn(this.state.boards);

      this.setState({
        searchTerm,
        searchType,
      });
    } else {
      // Make an api call that gets the pins with the search term .filter on all the boards
      this.setState({
        // results
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
