import React, { Component } from 'react';
import { Link } from 'react-router';


const BookTile = (props) => {
  return (
    <div>
      {props.name} by {props.thinker}

    </div>
  )
}


export default BookTile;
