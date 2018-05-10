import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import ShelvesIndexContainer from './containers/ShelvesIndexContainer';



class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={ShelvesIndexContainer} />
      </Router>
    );
  }
}

export default Routes;
