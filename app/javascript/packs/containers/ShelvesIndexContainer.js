import React, { Component } from 'react';
import BookTile from '../components/BookTile'
import SearchApp from '../components/SearchApp'
import ShelvesSaveContainer from './ShelvesSaveContainer'
import ThinkersRelateContainer from './ThinkersRelateContainer';
import ThinkerTile from '../components/ThinkerTile';


class ShelvesIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      selectedArray: [],
      searchText: '',
      searchResults: [],
      saveBooks: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.addNewBooks = this.addNewBooks.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  addNewBooks(submission) {
      event.preventDefault();
      fetch(`/api/v1/books.json`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(submission),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(book => {
        this.setState({ selectedArray: selectedArray })
      })
      .then(this.setState({ selectedArray: [] }) )
      .catch(error => console.error(`Error in fetch (submitting books error): ${error.message}`))
    }

  handleClick(book){
    // this.setState({selectedArray: id})
    if(this.state.selectedArray.includes(book)) {
      let remove = this.state.selectedArray.indexOf(book)
      this.state.selectedArray.splice(remove, 1)
    } else {
      this.state.selectedArray.push(book)
    }
    this.forceUpdate()
  }



  getSearchResults(query) {
    fetch(`/api/v1/searches/search?q=${query}`, {
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ books: body })
    })
    .catch(error => console.error(`Error in fetch (posting query): ${error.message}`))
  }

    handleSearchSubmit(event) {
      event.preventDefault()
      let query = this.state.searchText
      this.getSearchResults(query)
    }

    handleSearch(event) {
      let query = event.target.value
      this.setState({ searchText: query })
    }


  render(){

    let styleString;
    let booksArray = this.state.books.map((book) => {
      if(this.state.selectedArray.includes(book)) {
        styleString = "selectedbook"
      } else {
        styleString = "book"
      }

      let handleClick = () => this.handleClick(book)
      return (
        <BookTile
          key={book.id}
          id={book.id}
          name={book.name}
          thinker={book.thinker}
          year={book.year}
          image={book.image}
          handleClick={handleClick}
          styleString={styleString}
          />
      )
      return booksArray
    })

    return (
      <div className="rows">
        <h3 className="splash"><strong>Track your reading list and map out the connections you uncover</strong></h3>
        <h4 className="splash">Populate your personal philosophical library, then contribute to a shared model</h4>
        <div className="columns medium-6">
          <br/>
        <SearchApp
          handleSearchResults={this.handleSearchResults}
          handleSearchSubmit={this.handleSearchSubmit}
          handleSearch={this.handleSearch}
          searchText={this.state.searchText} />
        {booksArray}
      </div>
      <ShelvesSaveContainer
        booksArray={this.state.books}
        selectedArray={this.state.selectedArray}
        addNewBooks={this.addNewBooks}/>
      </div>
    )
  }
}

export default ShelvesIndexContainer;
