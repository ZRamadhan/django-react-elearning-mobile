/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './component/navigator';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  confirmButtons: {
    marginTop: '1rem',
    flexDirection: 'row',
  },
  confirmButtonText: {
    flex: 1,
    marginRight: '0.25rem',
    fontSize: '$small',
    textAlign: 'right',
    alignSelf: 'center',
  },
  backButtonContainer: {
    backgroundColor: '$blue',
    borderWidth: 0,
  },
  confirmButtonIcon: {
    tintColor: '$white',
  },
  copyUUID: {
    color: '$blue',
  },
});

export default class App extends Component {
  render() {
    return (
      <Navigator
        ref={(nav) => {
          this.navigator = nav;
        }}
      />
    )
  }
}


