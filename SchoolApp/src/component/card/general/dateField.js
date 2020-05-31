import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DateField extends React.Component {
  render() {
    return (
        <View style={{position:'absolute', right:5, bottom:5}}>
          <Text 
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              justifyContent: 'center'
            }}>
            {this.props.content}
          </Text>
        </View>
    )
  }
}

export default DateField;
