import React, { Component } from 'react';
import { InputGroup, Icon, Input } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';

export default class Inputs extends Component {
    render() {
        return (
          <View style={styles.container}>
            <Text style={{fontWeight:'200', color:'grey'}}>{this.props.placeholder}</Text>
            <InputGroup>
                <Icon name={this.props.iconName} />
                {this.props.type==='number' ? 
                  <Input style={{ padding:15, fontSize: 14, color: 'grey' }} placeholder={this.props.placeholder} keyboardType = 'numeric'/>
                  : <Input style={{ padding:15, fontSize: 14, color: 'grey' }} placeholder={this.props.placeholder}/>
                }
            </InputGroup>
          </View>
        )
    }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    height: 60,
  },
});
  