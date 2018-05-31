import React, { Component } from 'react';
import BookTile from '../components/BookTile'
import BookCard from '../components/BookCard'
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
    this.handleSave = this.handleSave.bind(this)
  }

  handleClick(id){
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
    let path = this.props.booksArray
    let selectedBooks = this.props.selectedArray

    let styleString = "card";
    let booksArray = path.map((book) => {

      if(selectedBooks.includes(book)) {
        styleString = "card"
      } else {
        styleString = "hiddenbook"
      }

      if(book.image == "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png") {
        book.image = null
      }

      let handleClick = () => this.handleClick(book)

      return (
        <BookCard
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
      <div className="columns medium-6">
        <br/>
        <button className="savebutton centered" onClick={this.handleSave}>Save Books to Shelf</button>
        {booksArray}
      </div>
    )
  }
}

export default ShelvesSaveContainer;
