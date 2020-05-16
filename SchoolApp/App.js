/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Navigator from './src/component/navigator';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import { store } from './src/reducers';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MenuProvider>
          <Navigator
            ref={(nav) => {
              this.navigator = nav;
            }}
          />
        </MenuProvider>
      </Provider>
    )
  }
}


