import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import FormGroup from '../../component/form/formGroup';
import { editLKN, get_lkn_by_penyidik } from '../../reduxActions/dashboard';
import { get_token } from '../../helper/requestHelper';

function Separator() {
  return <View style={styles.separator} />;
}

const formData = [
  {label: 'No. LKN', name: 'LKN', fieldName: 'LKN'},
  {label: 'Tanggal', name: 'Tanggal Dibuat', fieldName: 'tgl_dibuat', type:'date'},
]

class LKNEdit extends React.Component {
  state = {
    loading: false,
    isDataChange: false,
    form: {}
  }

  async componentDidMount(){
    this.setState({loading:true})
    //do api call here
    const token = await get_token()
    await this.props.dispatch(get_lkn_by_penyidik(token, this.props.id))
    this.setState({loading:false})
  }

  componentDidUpdate(prevProps){
    if(this.props.lknTableData !== prevProps.lknTableData){
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
    await this.props.dispatch(editLKN(token, this.state.form, this.props.id))
    if(!this.props.error){
      this.props.navigation.navigate('lkn.list')
    } else {
      console.log(this.props.error)
      return;
    }
    this.setState({ isLoading: false })
  }

  getDefaultForm = () => {
     this.setState({form: this.props.lknTableData}, () => this.setState({ isDataChange: true}))
  }

  render(){
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
        <FormGroup title="Edit Form LKN" formData={formData} defaultValue={this.state.form} onFormChange={this.onFormChange}/>
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
    lknTableData: dashboard.lknTableData,
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

export default connect(mapStateToProps)(LKNEdit)
