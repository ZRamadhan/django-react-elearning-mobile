import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { InputGroup, Icon, Input } from 'native-base';
import { withNavigation } from 'react-navigation';

const tersangkaField = [{
  title: 'No Penangkapan',
  fieldName: 'no_penangkapan_id'
},{
  title: 'Nama Tersangka',
  fieldName: 'nama_tersangka'
},{
  title: 'Jenis Kelamin',
  fieldName: 'jenis_kelamin'
},{
  title: 'Umur',
  fieldName: 'umur'
}]

class TersangkaCard extends React.PureComponent {
  render() {
    const { item } = this.props;
    console.log('item tersangka', item)
    return (
        <View 
        style={{
          borderWidth: 1,
          borderRadius: 2,
          padding:10,
          borderColor: '#ddd',
          borderBottomWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
          elevation: 2,
          margin: 10,
        }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('tersangka.details', {
          	id: item.id
          })}>
            {tersangkaField.map(data => 
              <View key={data.fieldName} style={{margin:5}}>
                <Text 
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    justifyContent: 'center'
                  }}>
                  {data.title}
                </Text>
                <Text 
                  style={{
                    fontSize: 13,
                    justifyContent: 'center'
                  }}>
                  {item[data.fieldName]}
                </Text>
              </View>
            )}
             <View style={{position:'absolute', right:5, top:5}}>
                <Menu>
                  <MenuTrigger>
                    <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-menu' />
                  </MenuTrigger>
                  <MenuOptions style={{backgroundColor: '#F5FCFF'}}>
                    <MenuOption onSelect={() => this.props.navigation.navigate('tersangka.edit', {
                      id: item.id
                    })}>
                      <Text style={{color: 'gray', fontWeight: 'bold'}}>Edit</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`Delete`)} >
                      <Text style={{color: 'red', fontWeight: 'bold'}}>Delete</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
          </TouchableOpacity>
        </View>
    )
  }
}

export default withNavigation(TersangkaCard);
