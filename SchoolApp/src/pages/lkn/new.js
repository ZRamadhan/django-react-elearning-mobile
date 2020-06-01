import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements'
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import FormGroup from '../../component/form/formGroup';
import { createLKN } from '../../reduxActions/dashboard';
import { get_token } from '../../helper/requestHelper';

function Separator() {
  return <View style={styles.separator} />;
}

const FORM = {
  LKN: 'LKN',
  Penangkapan: 'Penangkapan',
  BarangBukti: 'BarangBukti',
  Tersangka: 'Tersangka',
}
const lknFormData = [
  {label: 'No. LKN', name: 'LKN', fieldName: 'LKN'},
  {label: 'Tanggal', name: 'Tanggal Dibuat', fieldName: 'tgl_dibuat', type:'date'},
]

const penangkapanFormData = [
  {label: 'No. LKN', name: 'No LKN', fieldName: 'no_lkn'},
  {label: 'SP KAP', name: 'No Penangkapan', fieldName: 'no_penangkapan'},
  {label: 'TANGGAL PENANGKAPAN', name: 'Tanggal Penangkapan', fieldName: 'tanggal_penangkapan', type: 'date'},
  {label: 'MASA BERAKHIR PENANGKAPAN', name: 'Masa Berakhir Penangkapan', fieldName: 'masa_berakhir_penangkapan', type: 'date'},
]

const dropdownTSK = [{value:'laki-laki', name:'laki-laki'}, {value:'perempuan', name:'perempuan'}];

const tersangkaFormData = [
  {label: 'No. LKN', name: 'No LKN', fieldName: 'no_lkn'},
  {label: 'No. Penangkapan', name: 'No Penangkapan', fieldName: 'no_penangkapan'},
  {label: 'Nama Tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur', type: 'number'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', dropdown: dropdownTSK, type: 'select'},
  {label: 'Foto', name: 'foto', fieldName: 'foto', type: 'upload'}
]

const barangBuktiFormData = [
  {label: 'No. LKN', name: 'No LKN', fieldName: 'no_lkn'},
  {label: 'No. LKN', name: 'No LKN', fieldName: 'no_lkn'},
  {label: 'SP KAP', name: 'No Penangkapan', fieldName: 'no_penangkapan'},
  {label: 'TANGGAL PENANGKAPAN', name: 'Tanggal Penangkapan', fieldName: 'tanggal_penangkapan', type: 'date'},
  {label: 'MASA BERAKHIR PENANGKAPAN', name: 'Masa Berakhir Penangkapan', fieldName: 'masa_berakhir_penangkapan', type: 'date'},
]

class LKNNew extends React.Component {
  state = {
    loading: false,
    page: FORM.LKN,
    form: {}
  }

  async componentDidMount(){
    const token = await get_token()
    this.setState({loading:true})
    //do api call here
    setTimeout(() => this.setState({loading:false}), 2000);
  }

  onFormChange = (fieldName, e) => {
    console.log(fieldName, e)
    const formObj = {...this.state.form};
    if(!e.target){
      formObj[fieldName] = e
      this.setState({
          form: formObj,
      })
    } else {
      formObj[fieldName] = e.target.value
      this.setState({
          form: formObj,
      })
    }
  }

  onSubmit = async() => {
    this.setState({ isLoading: true })
    const token = await get_token()
    await this.props.dispatch(createLKN(token, this.state.form))
    if(!this.props.error){
      this.props.navigation.navigate('lkn.list')
    } else {
      console.log(this.props.error)
      return;
    }
    this.setState({ isLoading: false })
  }

  render(){
    const dropdown = [{value:'narkotika', name:'narkotika'}, {value:'non narkotika', name:'non narkotika'}];

    let barangBuktiFormData = [
      {label: 'BB', name: 'BB', fieldName: 'nama_barang'},
      {label: 'SP Sita', name: 'SP Sita', fieldName: 'sp_sita'},
      {label: 'Tap Sita', name: 'Tap Sita', fieldName: 'tap_sita'},
    ]

    if(this.state.form.jenis_barang === 'narkotika'){
      barangBuktiFormData.push({label: 'Tap Status', name: 'Tap Status', fieldName: 'tap_status'})
      barangBuktiFormData.push({label: 'Nomor Lab', name: 'Nomor Lab', fieldName: 'nomor_lab'})
    }

    barangBuktiFormData.push({label: 'Jenis Barang', name: 'Jenis Barang', fieldName: 'jenis_barang', type: 'select', dropdown: dropdown})

    //refer navigation path in component navigator , buttonGroup is button that will be render in bottom animation menu
    const buttonGroup = (
      <Button
        title="Solid Button"
        type="outline"
        containerStyle={{padding:10}}
      />
    )

    let Form = '';
    let title = '';
    if(this.state.page === FORM.LKN){
      Form = lknFormData
      title = FORM.LKN
    } else if(this.state.page === FORM.Penangkapan){
      Form = penangkapanFormData
      title = FORM.Penangkapan
    } else if(this.state.page === FORM.Tersangka){
      Form = tersangkaFormData
      title = FORM.Tersangka
    } else if(this.state.page === FORM.BarangBukti){
      Form = barangBuktiFormData
      title = FORM.BarangBukti
    }

    return (
      <NavigationBar hideSearch disableMenu renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
        <FormGroup title={`FORM ${title}`} defaultValue={this.state.form} formData={Form} onFormChange={this.onFormChange}/>
        <Button
          title={`BUAT ${title}`}
          containerStyle={{padding:10}}
          onPress={this.onSubmit}
        />
        <Separator />
        <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
          <TouchableOpacity 
            style={{margin:5, justifyContent:'center', alignItems:'center', backgroundColor:'#A5DDFC', height:40, borderRadius:20, width:80}}
            onPress={() => this.setState({page: FORM.LKN})}
          >
            <View style={{flexDirection:'row'}}>
              {(this.state.page === FORM.LKN) && (
                <Icon
                  name="done"
                  size={15}
                  color="white"
                />
              )}
              <Text style={{fontWeight:'bold', color:'gray'}}>LKN</Text>
            </View>
          </TouchableOpacity>
           <TouchableOpacity 
            style={{margin: 5, justifyContent:'center', alignItems:'center', backgroundColor:'#A5DDFC', height:40, borderRadius:20, width:100}}
            onPress={() => this.setState({page: FORM.Penangkapan})}
          >
            <View style={{flexDirection:'row'}}>
              {(this.state.page === FORM.Penangkapan) && (
                <Icon
                  name="done"
                  size={15}
                  color="white"
                />
              )}
              <Text style={{fontWeight:'bold', color:'gray'}}>Penangkapan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{margin:5, justifyContent:'center', alignItems:'center', backgroundColor:'#A5DDFC', height:40, borderRadius:20, width:100}}
            onPress={() => this.setState({page: FORM.Tersangka})}
          >
            <View style={{margin:10, flexDirection:'row'}}>
              {(this.state.page === FORM.Tersangka) && (
                <Icon
                  name="done"
                  size={15}
                  color="white"
                />
              )}
              <Text style={{fontWeight:'bold', color:'gray'}}>Tersangka</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{margin:5, justifyContent:'center', alignItems:'center', backgroundColor:'#A5DDFC', height:40, borderRadius:20, width:100}}
            onPress={() => this.setState({page: FORM.BarangBukti})}
          >
            <View style={{margin:10, flexDirection:'row'}}>
              {(this.state.page === FORM.BarangBukti) && (
                <Icon
                  name="done"
                  size={15}
                  color="white"
                />
              )}
              <Text style={{fontWeight:'bold', color:'gray'}}>Barang Bukti</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </NavigationBar>
    )
  }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    error: dashboard.error,
    lknCreated: dashboard.lknCreated,
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

export default connect(mapStateToProps)(LKNNew)
