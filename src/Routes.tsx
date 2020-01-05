import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import Login from './Pages/Login/Login';
import QRScan from './Pages/QRScan/QRScan';
import Selection from './Pages/Selection/Selection';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={process.env.PUBLIC_URL + '/test'} component={Selection} />
          <Route path={process.env.PUBLIC_URL + '/'} component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
