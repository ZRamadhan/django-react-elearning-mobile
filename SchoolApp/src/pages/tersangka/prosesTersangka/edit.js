import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import FormGroup from '../../../component/form/formGroup';
import NavigationBar from '../../../component/navigationBar';

function Separator() {
  return <View style={styles.separator} />;
}

export default class ProsesTersangkaEdit extends React.Component {
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
      let formData = [
        {label: 'Jenis Proses', name: 'Jenis Proses', fieldName: 'jenis_proses', dropdown: jenis_proses_drop, type: 'select', disabled: this.props.edit ? true : false},
      ]
      if(jenis_proses === 1 || jenis_proses === 2){
        formData.push({label: 'TAP HAN', name: 'TAP HAN', fieldName: 'tap_han'})
        formData.push({label: 'DOKUMEN TAP HAN', name: 'DOKUMEN TAP HAN', fieldName: 'tap_han_doc', type: 'upload'})
      }

      if(jenis_proses === 3){
        formData.push({label: 'SURAT PERPANJANGAN HAN', name: 'SURAT PERPANJANGAN HAN', fieldName: 'surat_perpanjangan_han'})
        formData.push({label: 'DOKUMEN SURAT PERPANJANGAN HAN', name: 'DOKUMEN SURAT PERPANJANGAN HAN', fieldName: 'surat_perpanjangan_han_doc', type: 'upload'})
      }

      if(jenis_proses === 4){
        formData.push({label: 'SP.HAN', name: 'SP.HAN', fieldName: 'sp_han'})
        formData.push({label: 'DOKUMEN SP.HAN', name: 'DOKUMEN SP.HAN', fieldName: 'sp_han_doc', type: 'upload'})
      }

      formData.push({label: 'Keterangan', name: 'Keterangan', fieldName: 'keterangan', type: 'area'})

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
        <FormGroup title="Edit Proses Tersangka" formData={formData}/>
        <Button
          title={`Edit Proses Tersangka-${this.props.id}`}
          type="outline"
          containerStyle={{padding:10}}
          onPress={() => {
            this.props.navigation.navigate('prosesTSK.list')
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
