import React, { Component } from 'react'
import { InputGroup, DatePicker, Icon } from 'native-base';
import { StyleSheet } from 'react-native';

export default class DatePickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  render() {
    return (
      <InputGroup style={styles.container}>
        <Icon name='calendar' />
        <DatePicker
          defaultDate={new Date(2018, 4, 4)}
          modalTransparent={true}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText={this.props.placeholder}
          onDateChange={this.setDate}
          disabled={false}
        />
      </InputGroup> 
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginLeft: 15,
    height: 35,
  },
});
  
