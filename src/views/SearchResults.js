import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCard';
import PinsCard from '../components/Cards/PinsCard';

export default class SearchResults extends Component {
  state = {
    boards: this.props.boards,
    pins: this.props.pins,
    results: [],
    searchTerm: '',
    searchType: '',
  };

  componentDidMount() {
    this.performSearch();
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
