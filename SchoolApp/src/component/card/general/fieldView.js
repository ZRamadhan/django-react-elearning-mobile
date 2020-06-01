import React, { Component } from 'react';
import { View, Text } from 'react-native';

class TransparentCard extends React.Component {
  render() {
    return (
        <View style={{margin:5}}>
          <Text 
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              justifyContent: 'center'
            }}>
            {this.props.title}
          </Text>
          <Text 
            style={{
              fontSize: 13,
              justifyContent: 'center'
            }}>
            {this.props.content}
          </Text>
        </View>
    )
  }
}

export default TransparentCard;
