import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import DatePicker from '../datePicker.android';
import Input from '../input';
import TimePicker from '../timePicker';
import Picker from '../picker';
import TextArea from '../textArea';

const dropdown = [{value:'laki-laki', name:'laki-laki'}, {value:'perempuan', name:'perempuan'}];
const formData = [
  {label: 'Nama Tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', dropdown: dropdown, type: 'select'},
  {label: 'Nama Tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka', type: 'number'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur', type: 'time'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', type: 'area'},
]

export default class FormGroup extends Component {
   render(){
    const FormList = formData.map((data) => {
      if(data.type === 'input' || data.type === null || data.type === undefined){
        return (
          <Input placeholder={data.label}/>
        )
      } else if(data.type === 'date'){
        return (
          <DatePicker placeholder={data.label}/>
        ) 
      } else if(data.type === 'select'){
        return (
          <Picker placeholder={data.label} dropdown={data.dropdown}/>
        )
      } else if(data.type === 'number'){
        return (
          <Input placeholder={data.label} type='number'/>
        )
      } else if(data.type === 'time'){
        return (
          <TimePicker placeholder={data.label}/>
        )
      } else if(data.type === 'area'){
        return (
          <TextArea placeholder={data.label}/>
        )
      } 
      return <Text />
    }
  );

     return (
         <Container style={{backgroundColor:'rgba(255, 255, 255, 0.3)'}}>
             <Content>
                 <Text style={{fontSize:20, fontWeight:'bold', color:'grey', marginBottom:10}}>FORM PENANGKAPAN</Text>
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