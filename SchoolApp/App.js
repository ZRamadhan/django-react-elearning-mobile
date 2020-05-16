/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Navigator from './src/component/navigator';
import { MenuProvider } from 'react-native-popup-menu';

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <Navigator
          ref={(nav) => {
            this.navigator = nav;
          }}
        />
      </MenuProvider>
    )
  }
}


