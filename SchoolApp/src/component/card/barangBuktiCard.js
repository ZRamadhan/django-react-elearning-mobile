import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import TransparentCard from './general/transparentCard';
import ActionButton from './general/actionButton';
import DateField from './general/dateField';
import FieldView from './general/fieldView';
import { withNavigation } from 'react-navigation';
import { get_token, request } from '../../helper/requestHelper';

const barangBuktiField = [{
  title: 'Jenis Barang',
  fieldName: 'jenis_barang'
},{
  title: 'Nama Barang',
  fieldName: 'nama_barang'
},{
  title: 'SP Sita',
  fieldName: 'sp_sita'
}]

class BarangBuktiCard extends React.PureComponent {
  
  onDelete = async(id) => {
    var token = await get_token();
    return request(`/api/bb-edit/${id}/`, {
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
        <TransparentCard onPress={() => this.props.navigation.navigate('barangbukti.details', {
            id: item.id
        })}>
          {barangBuktiField.map(data => 
            <FieldView key={data.fieldName} title={data.title} content={item[data.fieldName]} />
          )}
          <FieldView title='No LKN' content={item.milik_tersangka_id.no_penangkapan_id.no_lkn.LKN}/>
          <FieldView title='Nama Tersangka' content={item.milik_tersangka_id.nama_tersangka}/>            
          <ActionButton
            onEdit={() => this.props.navigation.navigate('barangbukti.edit', {
              id: item.id
            })}
            onDelete={() => this.onDelete(item.id)}
          />
        </TransparentCard>
    )
  }
}

export default withNavigation(BarangBuktiCard);
