import React, { Component } from 'react';
import { InputGroup, Icon, Input } from 'native-base';
import { StyleSheet } from 'react-native';

export default class SearchBar extends Component {
    render() {
        return (
            <InputGroup style={styles.container}>
                <Icon name='ios-search' />
                <Input placeholder='Search' />
                <Icon name='ios-people' />
            </InputGroup>
        )
    }
}

var styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginLeft: 15,
    height: 35,
  },
});
  