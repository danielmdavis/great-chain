import React, { Component } from 'react';
import { Link } from 'react-router';


const ThinkerTile = (props) => {
  return (
    <div className="columns medium-4 end" onClick={props.handleClick}>
        <div className={props.styleString}>
          <span className="title">{props.name}</span>
        </div>
    </div>
  )
}


export default ThinkerTile;
