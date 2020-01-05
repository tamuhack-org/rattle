import React from 'react';
import { HashRouter, Switch, Route, Router } from 'react-router-dom';
import Login from './Pages/Login/Login';
import QRScan from './Pages/QRScan/QRScan';
import Selection from './Pages/Selection/Selection';

class Routes extends React.Component {
  render() {
    return (
      <HashRouter basename='/'>
        <Switch>
          <Route path={'/test'} component={Selection} />
          <Route path={'/'} component={Login} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Routes;
