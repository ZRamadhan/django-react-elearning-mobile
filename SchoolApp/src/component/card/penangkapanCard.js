import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import TransparentCard from './general/transparentCard';
import { deletepenangkapan } from '../../reduxActions/dashboard';
import { setSelectedPnkpId } from '../../reduxActions/dashboard';
import { connect } from 'react-redux';
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
        <TransparentCard onPress={() => {
            this.props.navigation.navigate('penangkapan.details', {
             id: item.id
            })
            this.props.dispatch(setSelectedPnkpId(item.id))
          }
        }>
          <FieldView title='No LKN' content={item.no_lkn}/>
          <FieldView title='SP KAP' content={item.no_penangkapan}/>
          <FieldView title='Tanggal Penangkapan' content={item.tanggal_penangkapan}/>
          <FieldView title='Masa Berakhir Penangkapan' content={item.masa_berakhir_penangkapan}/>           
           
          <ActionButton
            onEdit={() => {
              this.props.navigation.navigate('penangkapan.edit', {
                id: item.id
              })
              this.props.dispatch(setSelectedPnkpId(item.id))
             }
            }
            onDelete={() => this.onDelete(item.id)}
          />
        </TransparentCard>
    )
  }
}

export default connect()(withNavigation(PenangkapanCard));