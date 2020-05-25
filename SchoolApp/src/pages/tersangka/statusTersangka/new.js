import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import FormGroup from '../../../component/form/formGroup';
import NavigationBar from '../../../component/navigationBar';

function Separator() {
  return <View style={styles.separator} />;
}

export default class StatusTersangkaNew extends React.Component {
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
      const rekam_jejak = [{value:'Masuk', name:'Masuk'}, {value:'Keluar', name:'Keluar'}]
      const status_penahanan = [{value:'Di Amankan', name:'Diamankan'}, {value:'Di tahan', name:'Ditahan'}, {value:'TAT', name:'TAT'}, {value:'Selesai', name:'Selesai'}]
      const formData = [
        {label: 'Status Penahanan', name: 'Status Penahanan', fieldName: 'status_penahanan', dropdown: status_penahanan, type: 'select'},
        {label: 'Rekam Jejak', name: 'Rekam Jejak', fieldName: 'rekam_jejak', dropdown: rekam_jejak, type: 'select'},
        {label: 'Tanggal', name: 'Tanggal', fieldName: 'tanggal', type: 'date'},
        {label: 'Waktu', name: 'Waktu', fieldName: 'waktu', type: 'time'},
        {label: 'Keterangan', name: 'Keterangan', fieldName: 'keterangan', type: 'area'},
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
        <FormGroup title="Buat Status Tersangka" formData={formData}/>
        <Button
          title="Buat Status Tersangka"
          type="outline"
          containerStyle={{padding:10}}
          onPress={() => {
            this.props.navigation.navigate('statusTSK.list')
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
