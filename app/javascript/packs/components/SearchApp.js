import React from 'react';
import { Link } from 'react-router';
import SearchForm from './SearchForm';

class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(input) {
    this.state.searchText = input
    this.props.updateSearchResults(this.state.searchText)
  }

  render() {
    return(
    <div>
      <div>
        <SearchForm
          value={this.state.searchText}
          handleSearch={this.handleSearch}
        />
      </div>
    </div>
  )}
}

export default SearchApp;
