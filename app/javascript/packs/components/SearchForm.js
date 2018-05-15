import React, { Component } from 'react';

const SearchForm = props => {
  // let handleSearch = (event) => {
  //     props.handleSearch(event.target.value);
  //    };

  return(
    <form onSubmit={props.handleSearchSubmit}>
      <input
        value={props.searchText}
        type='text'
        onChange={props.handleSearch}
        placeholder="Search for a Book or Philosopher"
      />

    </form>
  );
};

export default SearchForm;
