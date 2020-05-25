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
import { deletelkn } from '../../reduxActions/dashboard';
import axios from 'axios';
import { get_token, request } from '../../helper/requestHelper';
let baseUrl = 'http://178.128.80.233:8000';

class LKNCard extends React.PureComponent {
  
  async onDelete(id) {
    var token = await get_token();
    console.log('token',token)
    console.log('item.id',id)
    // var result = await axios.delete(`http://178.128.80.233:8000/api/lkn/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
    // console.log('result',result)
    return request(`/api/lkn/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
    location.reload();
  }
  render() {
    const { item } = this.props;
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('lkn.details', {
          	id: item.id
          })}>
            <View style={{margin:5}}>
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  justifyContent: 'center'
                }}>
                No LKN
              </Text>
              <Text 
                style={{
                  fontSize: 13,
                  justifyContent: 'center'
                }}>
                {item.LKN}
              </Text>
            </View>
            <View style={{margin:5}}>
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  justifyContent: 'center'
                }}>
                Nama Penyidik
              </Text>
              <Text 
                style={{
                  fontSize: 13,
                  justifyContent: 'center'
                }}>
                {`${item.penyidik.nama_depan || ''} ${item.penyidik.nama_belakang || ''}`}
              </Text>
            </View>
            <View style={{position:'absolute', right:5, bottom:5}}>
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  justifyContent: 'center'
                }}>
                {item.tgl_dibuat}
              </Text>
            </View>
             <View style={{position:'absolute', right:5, top:5}}>
                <Menu>
                  <MenuTrigger>
                    <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-menu' />
                  </MenuTrigger>
                  <MenuOptions style={{backgroundColor: '#F5FCFF'}}>
                    <MenuOption onSelect={() => this.props.navigation.navigate('lkn.edit', {
                      id: item.id
                    })}>
                      <Text style={{color: 'gray', fontWeight: 'bold'}}>Edit</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => this.onDelete(item.id)} >
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

export default withNavigation(LKNCard);
