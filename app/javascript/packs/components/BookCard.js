import React, { Component } from 'react';
import { Link } from 'react-router';


const BookTile = (props) => {
  return (
    <div className={props.styleString} onClick={props.handleClick}>
        <div className="card">
        <img className="tilepic" src={props.image}/>
          <span className="title">{props.name}</span><br/>
            <span className="author"> by {props.thinker}</span>
        </div>
    </div>
  )
}


export default BookTile;
