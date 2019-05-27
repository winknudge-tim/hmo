// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('hmoApp', () => App);

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-native-router-flux';

import { appReducer } from './reducers';

import {name as appName} from './app.json';


import App from './App'

const ConnectedRouter = connect()(Router);

const enhancer = compose(
  applyMiddleware(thunk),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });


const store = createStore(appReducer, enhancer)

export default class ReduxApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter scenes={App} />
      </Provider>
    );
  }
}


AppRegistry.registerComponent(appName, () => ReduxApp);
