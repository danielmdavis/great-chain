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
      selectedFirst: '',
      selectedSecond: '',
      searchText: '',
      searchResults: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleClick(book){
    this.handleSave = this.handleSave.bind(this)

    if(this.state.selectedFirst == book.thinker.id){

      this.state.selectedFirst = ''
    } else if(this.state.selectedSecond == book.thinker.id){
      let remove = this.state.selectedFirst.indexOf(book.thinker.id)
      this.state.selectedSecond = ''
    } else if(this.state.selectedFirst == ''){
      this.state.selectedFirst = book.thinker.id
    } else if(this.state.selectedSecond == ''){
      this.state.selectedSecond = book.thinker.id
    }

    this.forceUpdate()
  }

  handleSave(event){
    this.props.addNewInfluence(this.props.selectedFirst,this.props.selectedSecond)
  }

  render(){
    let duplicateCheck = [];
    let books = this.props.books

    let thinkers = books.map((book) => {
      if(duplicateCheck.includes(book.thinker.id)) {
      } else {
        duplicateCheck.push(book.thinker.id)

      let styleString;
      if(this.state.selectedFirst == book.thinker.id){
        styleString = "teacherbook"
      }else if(this.state.selectedSecond == book.thinker.id){
        styleString = "studentbook"
      }else{
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
          <button className="savebutton centered" onClick={this.handleSave}>Click to SAVE Once You've Defined an Influence Relationship</button>
          {thinkers}
        </div>
      </div>
    )
  }
}

export default ThinkersRelateContainer;
