import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import FormGroup from '../../../component/form/formGroup';
import NavigationBar from '../../../component/navigationBar';

function Separator() {
  return <View style={styles.separator} />;
}

export default class StatusBarangBuktiEdit extends React.Component {
  state = {
    form: {},
    loading: false,
  }

  componentDidMount(){
    this.setState({loading:true})
    //do api call here
    setTimeout(() => this.setState({loading:false}), 2000);
  }

  render(){
      const satuan_drop = [{value:"gram", name:'gram'}, {value:"Kg", name:'Kg'}, {value:"PCS", name:'Pcs'}]
      const status_drop = [{value:"Masuk", name:'Masuk'}, {value:"Keluar", name:'Keluar'}]

      const formData = [
        {label: 'Tanggal Status', name: 'Tanggal Status', fieldName: 'tanggal_status', type: 'date'},
        {label: 'Waktu Status', name: 'Waktu Status', fieldName: 'waktu_status', type: 'time'},
        {label: 'Jumlah', name: 'Jumlah', fieldName: 'jumlah', type: 'number'},
        {label: 'Satuan', name: 'Satuan', fieldName: 'satuan', type: 'select', dropdown: satuan_drop},
        {label: 'Keterangan', name: 'Keterangan', fieldName: 'keterangan', type: 'area'},
        {label: 'Status', name: 'Status', fieldName: 'status', dropdown: status_drop, type: 'select'},
      ]

    //refer navigation path in component navigator , buttonGroup is button that will be render in bottom animation menu
    const buttonGroup = (
      <Button
        title="Solid Button"
        type="outline"
        containerStyle={{padding:10}}
      />
    )
    return (
      <NavigationBar hideSearch disableMenu renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
        <FormGroup title="Edit Status Barang Bukti" formData={formData}/>
        <Button
          title={`Edit Status Barang Bukti-${this.props.id}`}
          type="outline"
          containerStyle={{padding:10}}
          onPress={() => {
            this.props.navigation.navigate('penangkapan.edit')
          }}
        />
        </SafeAreaView>
      </NavigationBar>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
