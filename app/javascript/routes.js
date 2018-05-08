import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import SpotsIndexContainer from './containers/SpotsIndexContainer';

class Routes extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={ShelvesIndexContainer} />

      </Router>
    );
  }
}

export default Routes;
