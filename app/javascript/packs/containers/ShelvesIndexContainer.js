import React, { Component } from 'react';
import BookTile from '../components/BookTile'

class ShelvesIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      selectedArray: [],
      searchText: '',
      searchResults: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id){
    // this.setState({selectedFirst: id})
    if(this.state.selectedArray.includes(id)) {
      this.state.selectedArray.splice(id)
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

  render(){

    let styleString;
    let booksArray = this.state.books.map((book) => {

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
      <div className="test">
        <h1>Add to Shelf</h1>
        {booksArray}
      </div>
    )
  }
}

export default ShelvesIndexContainer;
