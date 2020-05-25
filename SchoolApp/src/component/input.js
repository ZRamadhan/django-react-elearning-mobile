import React, { Component } from 'react';
import { InputGroup, Icon, Input } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';

export default class Inputs extends Component {
    render() {
        let input = <Input onChangeText={(text) => {this.props.onFormChange(this.props.fieldName, text)}} style={{ padding:15, fontSize: 14, color: 'grey' }} placeholder={this.props.placeholder} value={this.props.defaultValue}/>
        if(this.props.type === 'number'){
          input = <Input onChangeText={(text) => {this.props.onFormChange(this.props.fieldName, text)}} style={{ padding:15, fontSize: 14, color: 'grey' }} placeholder={this.props.placeholder} keyboardType = 'numeric'/>
        } else if(this.props.type === 'password'){
          input = <Input onChangeText={(text) => {this.props.onFormChange(this.props.fieldName, text)}} style={{ padding:15, fontSize: 14, color: 'grey' }} placeholder={this.props.placeholder} secureTextEntry/>
        }
        return (
          <View style={styles.container}>
            <Text style={{fontWeight:'200', color:'grey'}}>{this.props.placeholder}</Text>
            <InputGroup>
                <Icon name={this.props.iconName} />
                {input}
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
  