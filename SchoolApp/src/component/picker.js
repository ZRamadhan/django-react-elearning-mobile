import React, { Component } from 'react';
import { InputGroup, Item, Picker, Icon } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';

export default class PickerInputExample extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
    if(props.defaultValue){
      this.state = {
        selected2: props.defaultValue
      };
    }
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
    this.props.onFormChange(this.props.fieldName, value)
  }
  render() {
    return (
     <View style={styles.container}>
       <Text style={{fontWeight:'200', color:'grey'}}>{this.props.placeholder}</Text>
        <InputGroup>
            <Icon name={this.props.iconName} />
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
                      {/* <Picker.Item label={this.props.defaultValue} value={this.props.defaultValue} /> */}
                      {this.props.dropdown.map(data =>
                        <Picker.Item key={data.value} label={data.name} value={data.value} />    
                      )}
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