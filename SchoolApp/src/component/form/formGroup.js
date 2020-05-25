import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import DatePicker from '../datePicker.android';
import Input from '../input';
import TimePicker from '../timePicker';
import Picker from '../picker';
import TextArea from '../textArea';

export default class FormGroup extends Component {
   render(){
    const FormList = (this.props.formData || []).map((data) => {
      if(data.type === 'input' || data.type === null || data.type === undefined){
        var defaultInput = '';
        if(this.props.defaultValue) {
          defaultInput = this.props.defaultValue[data.fieldName]
        }
        return (
          <Input defaultValue={defaultInput} onFormChange={this.props.onFormChange} fieldName={data.fieldName} key={data.label} placeholder={data.label}/>
        )
      } else if(data.type === 'password'){
        return (
          <Input onFormChange={this.props.onFormChange} fieldName={data.fieldName} key={data.label} placeholder={data.label} type='password'/>
        )
      }
      else if(data.type === 'date'){
        var defaultDate = '';
        if(this.props.defaultValue) {
          defaultDate = this.props.defaultValue[data.fieldName]
        }
        return (
          <DatePicker defaultValue={defaultDate} onFormChange={this.props.onFormChange} fieldName={data.fieldName} key={data.label} placeholder={data.label}/>
        ) 
      } else if(data.type === 'select'){
        var defaultInput = '';
        if(this.props.defaultValue) {
          defaultInput = this.props.defaultValue[data.fieldName]
        }
        return (
          <Picker defaultValue={defaultInput} onFormChange={this.props.onFormChange} fieldName={data.fieldName} key={data.label} placeholder={data.label} dropdown={data.dropdown}/>
        )
      } else if(data.type === 'number'){
        var defaultInput = '';
        if(this.props.defaultValue) {
          defaultInput = this.props.defaultValue[data.fieldName]
        }
        return (
          <Input defaultValue={defaultInput} onFormChange={this.props.onFormChange} fieldName={data.fieldName} key={data.label} placeholder={data.label} type='number'/>
        )
      } else if(data.type === 'time'){
        return (
          <TimePicker key={data.label} placeholder={data.label}/>
        )
      } else if(data.type === 'area'){
        return (
          <TextArea key={data.label} placeholder={data.label}/>
        )
      } 
      return <Text />
    }
  );

     return (
         <Container style={{backgroundColor:'rgba(255, 255, 255, 0.5)'}}>
             <Content>
                 <Text style={{
                   fontSize:20, 
                   fontWeight:'bold', 
                   color:'grey', 
                   margin: 10, 
                   textDecorationLine: "underline",
                   textDecorationStyle: "solid",
                   textDecorationColor: "#000"
                   }}
                 >
                  {this.props.title}
                </Text>
                 <List>
                    {FormList}
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