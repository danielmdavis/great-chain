import React, { Component } from 'react';
import BookTile from '../components/BookTile'
import SearchApp from '../components/SearchApp'

class ShelvesSaveContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      selectedArray: [],
      searchText: '',
      searchResults: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.updateSearchResults = this.updateSearchResults.bind(this)
  }

  handleClick(id){
    // this.setState({selectedArray: id})
    if(this.state.selectedArray.includes(id)) {
      let remove = this.state.selectedArray.indexOf(id)
      this.state.selectedArray.splice(remove, 1)
    } else {
      this.state.selectedArray.push(id)
    }
    this.forceUpdate()
  }

  componentDidMount() {
      fetch('/api/v1/books.json')
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
      if(this.state.selectedArray.includes(book.id)) {
        styleString = "selectedbook"
      } else {
        styleString = "book"
      }

      let handleClick = () => this.handleClick(book.id)

      return (
        <BookTile
          key={book.id}
          id={book.id}
          name={book.name}
          thinker={book.thinker.name}
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

export default ShelvesSaveContainer;
