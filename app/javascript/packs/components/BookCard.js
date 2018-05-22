import React, { Component } from 'react';
import { Link } from 'react-router';

const DEFAULT_IMG = 'https://cdn2.iconfinder.com/data/icons/hicons-outline/512/book2-512.png';

const BookCard = (props) => {
  const img = props.image || DEFAULT_IMG;
  return (
    <div className="columns medium-4 end" onClick={props.handleClick}>
      <div className={props.styleString}>
        <img className="tilepic" src={img}/>
        <span className="cardtitle">{props.name}</span>
        <span className="cardauthor"> by {props.thinker}</span>
      </div>
    </div>
  )
}


export default BookCard;
