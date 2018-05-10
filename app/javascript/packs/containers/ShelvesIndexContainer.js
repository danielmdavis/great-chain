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
          this.setState({ books: body });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    const { book } = this.state
    return (
      <BookTile
        key={book.id}
        id={book.id}
        name={book.name}
        thinker={book.thinker}
        year={book.year}
      />
    )
  }
}

export default ShelvesIndexContainer;
