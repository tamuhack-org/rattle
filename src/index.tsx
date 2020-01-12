import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Pages/Routes';
import Login from './Pages/Login/Login';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';

import 'react-toastify/dist/ReactToastify.css';

const ReduxApp = () => {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
    </Provider>
  )
}

ReactDOM.render(<ReduxApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();