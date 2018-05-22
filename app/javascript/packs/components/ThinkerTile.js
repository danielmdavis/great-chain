import React, { Component } from 'react';
import { Link } from 'react-router';

const DEFAULT_IMG = 'https://cdn4.iconfinder.com/data/icons/roman-empire/500/roman-ancient-Empire_12-512.png';


const ThinkerTile = (props) => {
  const img = props.image || DEFAULT_IMG;
  return (
    <div className="columns medium-4 end" onClick={props.handleClick}>
        <div className={props.styleString}>
        <img className="tilepic" src={img}/>
          <span className="title">{props.name}</span>
        </div>
    </div>
  )
}


export default ThinkerTile;
