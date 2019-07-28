import React, { Component } from 'react';
import QRScan from './Pages/QRScan.js';
import Admin from './Pages/Admin.js';
import Login from './Pages/Login.js';

import { Router, Stack, Scene } from 'react-native-router-flux';

type Props = {};
class App extends Component<Props> {
 render() {
   return (
     <Router>
      <Stack key="root">
        <Scene key="login" component={Login} hideNavBar />
        <Scene key="admin" component={Admin} hideNavBar />
        <Scene key="qrscan" component={QRScan} hideNavBar />
      </Stack>
     </Router>
   );
 }
}
export default App;
