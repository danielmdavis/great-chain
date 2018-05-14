import React, { Component } from 'react';
import BookTile from '../components/BookTile'
import SearchApp from '../components/SearchApp'
import ThinkerTile from '../components/ThinkerTile';

class ThinkersRelateContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      selectedArray: [],
      searchText: '',
      searchResults: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleClick(book){
    this.handleSave = this.handleSave.bind(this)
    if(this.state.selectedArray.includes(book.thinker.id)) {
      let remove = this.state.selectedArray.indexOf(book.thinker.id)
      this.state.selectedArray.splice(remove, 1)
    } else {
      this.state.selectedArray.push(book.thinker.id)
    }
    this.forceUpdate()
  }

  handleSave(event){
    this.props.addNewBooks(this.props.selectedArray)
  }

  render(){
    let duplicateCheck = [];
    let books = this.props.books

    let thinkers = books.map((book) => {
      if(duplicateCheck.includes(book.thinker.id)) {
      } else {
        duplicateCheck.push(book.thinker.id)

      let styleString;
      if(this.state.selectedArray.includes(book.thinker.id)) {
        styleString = "selectedbook"
      } else {
        styleString = "book"
      }

      let handleClick = () => this.handleClick(book)
      return (
        <ThinkerTile
          key={book.id}
          id={book.id}
          name={book.thinker.name}
          handleClick={handleClick}
          styleString={styleString}
          />
        )

      }

      })

    return (
      <div className="rows">
        <div className="columns medium-6">
          <br/>
          <button className="savebutton centered" onClick={this.handleSave}>Save a Student Teacher Relationship</button>
          {thinkers}
        </div>
      </div>
    )
  }
}

export default ThinkersRelateContainer;
