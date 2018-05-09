import React, { Component } from 'react';

class ShelvesIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      searchText: '',
      searchResults: []
    }


  }


  componentDidMount(){
      fetch('/api/v1/books.json')
        .then(response => {
          if (response.ok) {;
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


  return (
    <BookTile
      key={book.id}
      id={book.id}
      title={book.title}
      thinker={book.author}
      year={book.year}
    />

  )

}

export default ShelvesIndexContainer;
