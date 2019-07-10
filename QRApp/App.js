import React, { Component } from 'react';
import Admin from './src/Pages/Admin.js';
import QRScan from './src/Pages/QRScan.js';

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <QRScan />
    );
  }
}

export default App;
