import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import FormGroup from '../../component/form/formGroup';
import NavigationBar from '../../component/navigationBar';

function Separator() {
  return <View style={styles.separator} />;
}

export default class BarangBuktiEdit extends React.Component {
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
    const dropdown = [{value:'narkotika', name:'narkotika'}, {value:'non narkotika', name:'non narkotika'}];

    let formData = [
      {label: 'BB', name: 'BB', fieldName: 'nama_barang'},
      {label: 'SP Sita', name: 'SP Sita', fieldName: 'sp_sita'},
      {label: 'Tap Sita', name: 'Tap Sita', fieldName: 'tap_sita'},
    ]

    if(this.state.form.jenis_barang === 'narkotika'){
      formData.push({label: 'Tap Status', name: 'Tap Status', fieldName: 'tap_status'})
      formData.push({label: 'Nomor Lab', name: 'Nomor Lab', fieldName: 'nomor_lab'})
    }

    formData.push({label: 'Jenis Barang', name: 'Jenis Barang', fieldName: 'jenis_barang', type: 'select', dropdown: dropdown})

    //refer navigation path in component navigator , buttonGroup is button that will be render in bottom animation menu
    const buttonGroup = (
      <Button
        title="Solid Button"
        type="outline"
        containerStyle={{padding:10}}
      />
    )
    return (
      <NavigationBar renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
        <FormGroup title="Edit Barang Bukti" formData={formData}/>
        <Button
          title="Edit Barang Bukti"
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
