import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { StyleSheet } from 'react-native';
import DatePicker from '../datePicker.android';
import Input from '../input';
import TimePicker from '../timePicker';
import Picker from '../picker';
import TextArea from '../textArea';

export default class FormGroup extends Component {
   render(){
     return (
         <Container style={styles.container}>
             <Content>
                 <List>
                    <Picker />
                    <DatePicker placeholder='Set Date'/>
                    <TimePicker placeholder='Set Time'/>
                    <Input placeholder='Fill Value'/>
                    <Input placeholder='Fill Number Value' type='number'/>
                    <TextArea />
                 </List>
             </Content>
         </Container>
     )
   }
}

var styles = StyleSheet.create({
    container: {
      marginTop: 0,
      marginRight: 15,
      marginLeft: 15,
      height: 35,
    },
  });