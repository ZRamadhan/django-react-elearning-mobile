import React, { Component } from 'react';
import { Container, Content, List, ListItem, InputGroup, Input, Icon } from 'native-base';
import { StyleSheet } from 'react-native';

export default class FormGroup extends Component {
   render(){
     return (
         <Container style={styles.container}>
             <Content>
                 <List>
                     <ListItem>
                         <InputGroup>
                            <Icon name='ios-person' />
                            <Input placeholder='Email' />
                         </InputGroup>
                     </ListItem>
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