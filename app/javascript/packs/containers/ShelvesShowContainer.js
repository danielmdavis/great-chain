import React, { Component } from 'react';
import BookTile from '../components/BookTile'
import SearchApp from '../components/SearchApp'
import ShelvesSaveContainer from './ShelvesSaveContainer'

class ShelvesIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      selectedArray: [],
      searchText: '',
      searchResults: [],
      saveBooks: [],
      query: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.addNewBooks = this.addNewBooks.bind(this)
  }

    updateSearchResults(query) {
    event.preventDefault();
    debugger;
    fetch(`/shelves.json`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(query),
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
    .then(query => {
      this.setState({ query: query })
    })
    .catch(error => console.error(`Error in fetch (submitting new review): ${error.message}`))
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
      .catch(error => console.error(`Error in fetch (submitting books error): ${error.message}`))
    }




  handleClick(book){
    // this.setState({selectedArray: id})
    if(this.state.selectedArray.includes(book)) {
      let remove = this.state.selectedArray.indexOf(book.id)
      this.state.selectedArray.splice(remove, 1)
    } else {
      this.state.selectedArray.push(book)
    }
    this.forceUpdate()
  }

  // let books = this.state.books
  // books.forEach(book => {
  //   if (this.state.selectedArray.includes(book.id)){
  //     debugger;
  //     this.state.saveBooks.push(book)
  //   }
  // })

  componentDidMount() {
      fetch('/api/v1/shelves/0.json')
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
          this.setState({ books: body.books });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


    updateSearchResults(searchText) {
      let tempResults = []
      this.state.books.map((book) => {
        let searchTerms = book.name + book.thinker.name
        if (searchTerms.toLowerCase().includes(searchText.toLowerCase())) {
          tempResults.push(book)
        }
      })
      this.setState({
        searchText: searchText,
        searchResults: tempResults,
      })
    }


  render(){

    let path
    if (this.state.searchText === '') {
      path = this.state.books
    } else {
      path = this.state.searchResults
    }

    let styleString;
    let booksArray = path.map((book) => {
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
          handleClick={handleClick}
          styleString={styleString}
          />
      )
      return booksArray
    })

    return (
      <div className="rows">
        <div className="columns medium-6">
          <br/>
        <SearchApp updateSearchResults={this.updateSearchResults} />
        {booksArray}
        </div>
      </div>
    )
  }
}

export default ShelvesIndexContainer;