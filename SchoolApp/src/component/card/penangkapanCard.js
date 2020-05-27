import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { connect } from 'react-redux';
import { setSelectedPnkpId } from '../../reduxActions/dashboard';
import { InputGroup, Icon, Input } from 'native-base';
import { withNavigation } from 'react-navigation';
import { deletepenangkapan } from '../../reduxActions/dashboard';
import { get_token, request } from '../../helper/requestHelper';

class PenangkapanCard extends React.PureComponent {

  async onDelete(id) {
    var token = await get_token();
    await this.props.dispatch(deletepenangkapan(token, id))
    if(!this.props.error){
      this.props.navigation.navigate('penangkapan.list')
    } else {
      console.log(this.props.error)
      return;
    }
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
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('penangkapan.details', {
          	 id: item.id
            })
            this.props.dispatch(setSelectedPnkpId(item.id))
           }
          }>
            <View style={{margin:5}}>
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  justifyContent: 'center'
                }}>
                No.LKN
              </Text>
              <Text 
                style={{
                  fontSize: 13,
                  justifyContent: 'center'
                }}>
                {item.no_lkn}
              </Text>
            </View>
            <View style={{margin:5}}>
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  justifyContent: 'center'
                }}>
                SP KAP
              </Text>
              <Text 
                style={{
                  fontSize: 13,
                  justifyContent: 'center'
                }}>
                {item.no_penangkapan}
              </Text>
            </View>
            <View style={{margin:5}}>
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  justifyContent: 'center'
                }}>
                Tanggal Penangkapan
              </Text>
              <Text 
                style={{
                  fontSize: 13,
                  justifyContent: 'center'
                }}>
                {item.tanggal_penangkapan}
              </Text>
            </View>
            <View style={{margin:5}}>
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  justifyContent: 'center'
                }}>
                Masa Berakhir Penangkapan
              </Text>
              <Text 
                style={{
                  fontSize: 13,
                  justifyContent: 'center'
                }}>
                {item.masa_berakhir_penangkapan}
              </Text>
            </View>
             <View style={{position:'absolute', right:5, top:5}}>
                <Menu>
                  <MenuTrigger>
                    <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-menu' />
                  </MenuTrigger>
                  <MenuOptions style={{backgroundColor: '#F5FCFF'}}>
                    <MenuOption onSelect={() => {
                      this.props.navigation.navigate('penangkapan.edit', {
                        id: item.id
                      })
                      this.props.dispatch(setSelectedPnkpId(item.id))
                     }
                    }>
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

export default connect()(withNavigation(PenangkapanCard));
