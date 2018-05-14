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

  handleSave(event){
    this.props.addNewBooks(this.props.selectedArray)

  }





  render(){

    let books = this.props.books
    let styleString = "book";

    let thinkers = books.map((book) => {
      let handleClick = () => this.handleClick(thinkers)
      return (
        <ThinkerTile
          key={book.thinker.id}
          id={book.thinker.id}
          name={book.thinker.name}
          handleClick={handleClick}
          styleString={styleString}
          />
        )
      })

    return (
      <div className="rows">
        <div className="columns medium-6">
          <br/>
          <button className="savebutton centered" onClick={this.handleSave}>Save Books to Shelf</button>
          {thinkers}
        </div>
      </div>
    )
  }
}

export default ThinkersRelateContainer;
