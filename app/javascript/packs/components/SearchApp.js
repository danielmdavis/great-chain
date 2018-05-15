import React from 'react';
import { Link } from 'react-router';
import SearchForm from './SearchForm';

class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }




  render() {
    return(
    <div>
      <div>
        <SearchForm
          handleSearch={this.props.handleSearch}
          handleSearchSubmit={this.props.handleSearchSubmit}
          searchText={this.props.searchText}
        />
      </div>
    </div>
  )}
}

export default SearchApp;
