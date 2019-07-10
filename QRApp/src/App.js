import React, { Component } from 'react';
import QRScan from './Pages/QRScan.js';
import Admin from './Pages/Admin.js';

import { Router, Stack, Scene } from 'react-native-router-flux';

type Props = {};
class App extends Component<Props> {
 render() {
   return (
     <Router>
      <Stack key="root">
        <Scene key="admin" component={Admin} />
        <Scene key="qrscan" component={QRScan} />
      </Stack>
     </Router>
   );
 }
}

export default App;
