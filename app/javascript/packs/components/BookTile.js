import React, { Component } from 'react';
import { Link } from 'react-router';


const BookTile = (props) => {
  return (
    <div className="row" onClick={props.handleClick}>
      <div className="columns medium-6">
        <div className={props.styleString}>
          {props.name} by {props.thinker}
        </div>
      </div>
    </div>
  )
}


export default BookTile;
