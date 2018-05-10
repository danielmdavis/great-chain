import React, { Component } from 'react';
import BookTile from '../components/BookTile'

class ShelvesIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      searchText: '',
      searchResults: []
    }
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

  render(){
    let booksArray = this.state.books.map((book) => {
      return (
        <BookTile
          key={book.id}
          id={book.id}
          name={book.name}
          thinker={book.thinker.name}
          year={book.year}
          />
      )
      return booksArray
    }
    )

    return (
      <div className="test">
        <h1>Hello from REACT</h1>
        {booksArray}
      </div>
    )
  }
}

export default ShelvesIndexContainer;
