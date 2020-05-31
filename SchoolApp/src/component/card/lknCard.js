import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';;
import { connect } from 'react-redux';
import { setSelectedLknId } from '../../reduxActions/dashboard';
import { InputGroup, Icon, Input } from 'native-base';
import TransparentCard from './general/transparentCard';
import ActionButton from './general/actionButton';
import DateField from './general/dateField'
import FieldView from './general/fieldView';
import { withNavigation } from 'react-navigation';
import { deletelkn } from '../../reduxActions/dashboard';
import { get_token, request } from '../../helper/requestHelper';

class LKNCard extends React.PureComponent {
  onDelete = async(id) => {
    var token = await get_token();
    return request(`/api/lkn/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
  
  render() {
    const { item } = this.props;
    return (
        <TransparentCard onPress={() => {
            this.props.navigation.navigate('lkn.details', {
             id: item.id
            })
            this.props.dispatch(setSelectedLknId(item.id))
           }
          }>
            <FieldView title='NO LKN' content={item.LKN}/>
            <FieldView 
              title='Nama Penyidik' 
              content= {`${item.penyidik.nama_depan || ''} ${item.penyidik.nama_belakang || ''}`}
            />
            <DateField content={item.tgl_dibuat} />
            <ActionButton
              onEdit={() => {
                this.props.navigation.navigate('lkn.edit', {
                  id: item.id
                });
                this.props.dispatch(setSelectedLknId(item.id));
               }
              }
              onDelete={() => this.onDelete(item.id)}
            />
        </TransparentCard>
    )
  }
}

export default connect()(withNavigation(LKNCard));
