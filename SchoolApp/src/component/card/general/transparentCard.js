import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

class TransparentCard extends React.Component {
  render() {
    return (
        <View 
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding:10,
          borderColor: '#ddd',
          borderBottomWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 8,
          margin: 10,
          backgroundColor: '#F7F7F7',
          opacity: 0.85
        }}>
          <TouchableOpacity onPress={this.props.onPress}>
            {this.props.children}
          </TouchableOpacity>
        </View>
    )
  }
}

export default TransparentCard;
