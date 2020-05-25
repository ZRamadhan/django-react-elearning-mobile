import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import FormGroup from '../../component/form/formGroup';
import { edittersangka, get_tersangka_list } from '../../reduxActions/dashboard';
import { get_token } from '../../helper/requestHelper';

function Separator() {
  return <View style={styles.separator} />;
}

const dropdown = [{value:'laki-laki', name:'laki-laki'}, {value:'perempuan', name:'perempuan'}];
const formData = [
  {label: 'Nama Tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur', type: 'number'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', dropdown: dropdown, type: 'select'},
  {label: 'Foto', name: 'foto', fieldName: 'foto', type: 'upload'}
]

class TersangkaEdit extends React.Component {
  state = {
    loading: false,
    isDataChange: false,
    form: {}
  }

  async componentDidMount(){
    this.setState({loading:true})
    //do api call here
    const token = await get_token()
    await this.props.dispatch(get_tersangka_list(token, this.props.id))
    this.setState({loading:false})
  }

  componentDidUpdate(prevProps){
    if(this.props.tersangkaData !== prevProps.tersangkaData){
      this.getDefaultForm()
    }
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
    await this.props.dispatch(edittersangka(this.state.form, token, this.props.id))
    if(!this.props.error){
      this.props.navigation.navigate('tersangka.list')
    } else {
      console.log(this.props.error)
      return;
    }
    this.setState({ isLoading: false })
  }

  getDefaultForm = () => {
     this.setState({form: this.props.tersangkaData}, () => this.setState({ isDataChange: true}))
  }

  render(){
    //refer navigation path in component navigator , buttonGroup is button that will be render in bottom animation menu
    const buttonGroup = (
      <React.Fragment>
        <Button
          title="List Status Tersangka"
          type="outline"
          icon={<Icon style={{fontSize:15, color:'#517fa4', padding:8}} name='list' />}
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('statusTSK.list')}
        />
        <Button
          title="List Proses Tersangka"
          type="outline"
          icon={<Icon style={{fontSize:15, color:'#517fa4', padding:8}} name='list' />}
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('prosesTSK.list')}
        />
      </React.Fragment>
    )
    return (
      <NavigationBar hideSearch renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
        <FormGroup title={`Edit Tersangka-${this.props.id}`} formData={formData} defaultValue={this.state.form} onFormChange={this.onFormChange}/>
        <Button
          title="Simpan"
          type="outline"
          containerStyle={{padding:10}}
          onPress={this.onSubmit}
        />
        <Separator />
      </SafeAreaView>
      </NavigationBar>
    )
  }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    error: dashboard.error,
    tersangkaData: dashboard.tersangkaData,
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

export default connect(mapStateToProps)(TersangkaEdit)
