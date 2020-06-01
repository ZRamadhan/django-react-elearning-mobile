import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import TransparentCard from './general/transparentCard';
import ActionButton from './general/actionButton';
import DateField from './general/dateField';
import FieldView from './general/fieldView';
import { withNavigation } from 'react-navigation';
import { get_token, request } from '../../helper/requestHelper';

const tersangkaField = [{
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
  
  async onDelete(id) {
    var token = await get_token();
    return request(`/api/tsk-edit/${id}/`, {
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
        <TransparentCard onPress={() => this.props.navigation.navigate('tersangka.details', {
            id: item.id
        })}>
          {tersangkaField.map(data => 
            <FieldView key={data.fieldName} title={data.title} content={item[data.fieldName]} />
          )}
          <FieldView title='No Penangkapan' content={item.no_penangkapan_id.id || item.no_penangkapan_id}/>
          <ActionButton
            onEdit={() => this.props.navigation.navigate('tersangka.edit', {
              id: item.id
            })}
            onDelete={() => this.onDelete(item.id)}
          />
        </TransparentCard>
    )
  }
}

export default withNavigation(TersangkaCard);
