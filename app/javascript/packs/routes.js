import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import ShelvesIndexContainer from './containers/ShelvesIndexContainer';
import ShelvesShowContainer from './containers/ShelvesShowContainer';



class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={ShelvesIndexContainer} />
        <Route path="/shelves/:id" component={ShelvesShowContainer} />
      </Router>
    );
  }
}

export default Routes;
