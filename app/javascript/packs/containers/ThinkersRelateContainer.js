import React, { Component } from 'react';
import BookTile from '../components/BookTile'
import SearchApp from '../components/SearchApp'
import ThinkerTile from '../components/ThinkerTile';

class ThinkersRelateContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      selectedFirst: '',
      selectedSecond: '',
      searchText: '',
      searchResults: [],
      influencePair: [],
      influenceMessage: 'To save an influence relationship, select a teacher',
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  addNewInfluence(submission) {
      event.preventDefault();
      fetch(`/api/v1/influences.json`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(submission),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          this.setState({ influenceMessage: 'Saved!' });
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(influence => {
        this.setState({ influencePair: influencePair })
      })
      .then(() => {
        this.setState({ selectedFirst: '' });
        this.setState({ selectedSecond: '' });
      })
      .catch(error => console.error(`Error in fetch (submitting books error): ${error.message}`))
    }


  handleClick(book){
    this.handleSave = this.handleSave.bind(this)
    let influenceMessage;
    if(this.state.selectedFirst == book.thinker.id){
      this.state.selectedFirst = ''
      influenceMessage = 'Select a teacher';
    } else if(this.state.selectedSecond == book.thinker.id){
      let remove = this.state.selectedFirst.indexOf(book.thinker.id)
      this.state.selectedSecond = ''
      influenceMessage = 'Select a student';
    } else if(this.state.selectedFirst == ''){
      this.state.selectedFirst = book.thinker.id
      influenceMessage = 'Select a student';
    } else if(this.state.selectedSecond == ''){
      this.state.selectedSecond = book.thinker.id
      influenceMessage = 'Click to save this influence relationship';
    }
    this.setState({ influenceMessage });
    this.forceUpdate()
  }

  handleSave(event){
    this.setState({ influenceMessage: 'Saving Influence Relationship' });
    this.state.influencePair.push(this.state.selectedFirst,this.state.selectedSecond)
    this.addNewInfluence(this.state.influencePair)
  }

  render(){
    let duplicateCheck = [];

    let thinkers = this.props.books.map((book) => {
      if(duplicateCheck.includes(book.thinker.id)) {
      } else {
        duplicateCheck.push(book.thinker.id) }

      let styleString = "card";
      if(this.state.selectedFirst === book.thinker.id){
        styleString = "teachercard"
      } else if(this.state.selectedSecond === book.thinker.id){
        styleString = "studentcard" }

      let handleClick = () => this.handleClick(book)
      return (
        <ThinkerTile
          key={book.id}
          id={book.id}
          image={book.thinker.image}
          name={book.thinker.name}
          handleClick={handleClick}
          styleString={styleString}
          />
        )

        return thinkers
      })

    return (
        <div className="columns medium-6">
          <br/>
          <button className="savebutton centered" onClick={this.handleSave}>{this.state.influenceMessage}</button>
          {thinkers}
        </div>
    )
  }
}

export default ThinkersRelateContainer;
