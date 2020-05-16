import React, { Component } from 'react';
import { InputGroup, Item, Picker, Icon } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';

export default class PickerInputExample extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
     <View style={styles.container}>
       <Text style={{fontWeight:'200', color:'grey'}}>Select Your SIM</Text>
        <InputGroup>
            <Icon name='funnel' />
            <Item picker style={{paddingRight:10}}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    style={{fontSize:10, fontWeight:'200', color:'grey', marginRight: 10}} 
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}
                    >
                    <Picker.Item label="Select Your SIM" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                </Picker>
            </Item>
        </InputGroup>
      </View>
    );
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