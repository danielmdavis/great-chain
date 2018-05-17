import React, { Component } from 'react';
import { Link } from 'react-router';


const BookCard = (props) => {
  return (
    <div className="columns medium-4 end" onClick={props.handleClick}>
      <div className={props.styleString}>
        <img className="tilepic" src={props.image}/><br/>
        <span className="cardtitle">{props.name}</span><br/>
        <span className="cardauthor"> by {props.thinker}</span>
      </div>
    </div>
  )
}


export default BookCard;
