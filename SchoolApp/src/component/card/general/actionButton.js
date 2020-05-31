import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon } from 'native-base';

class ActionButton extends React.Component {
  render() {
    return (
        <View style={{position:'absolute', right:5, top:5}}>
          <Menu>
            <MenuTrigger>
              <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-menu' />
            </MenuTrigger>
            <MenuOptions style={{backgroundColor: '#F5FCFF'}}>
              <MenuOption onSelect={this.props.onEdit}>
                <Text style={{color: 'gray', fontWeight: 'bold'}}>Edit</Text>
              </MenuOption>
              <MenuOption onSelect={this.props.onDelete} >
                <Text style={{color: 'red', fontWeight: 'bold'}}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
    )
  }
}

export default ActionButton;
