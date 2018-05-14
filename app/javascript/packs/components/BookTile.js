import React, { Component } from 'react';
import { Link } from 'react-router';


const BookTile = (props) => {
  return (
    <div className="row" onClick={props.handleClick}>
        <div className={props.styleString}>
          <span className="title">{props.name}</span>
            <span className="author"> by {props.thinker.name}</span>
        </div>
    </div>
  )
}


export default BookTile;
