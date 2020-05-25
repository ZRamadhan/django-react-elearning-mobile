import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import FormGroup from '../../component/form/formGroup';
import { createpenangkapan } from '../../reduxActions/dashboard';
import { get_token } from '../../helper/requestHelper';

function Separator() {
  return <View style={styles.separator} />;
}

const formData = [
  {label: 'SP KAP', name: 'No Penangkapan', fieldName: 'no_penangkapan'},
  {label: 'TANGGAL PENANGKAPAN', name: 'Tanggal Penangkapan', fieldName: 'tanggal_penangkapan', type: 'date'},
  {label: 'MASA BERAKHIR PENANGKAPAN', name: 'Masa Berakhir Penangkapan', fieldName: 'masa_berakhir_penangkapan', type: 'date'},
]

class PenangkapanNew extends React.Component {
  state = {
    loading: false,
    isDataChange: false,
    form: {}
  }

  componentDidMount(){
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
    var form = this.state.form
    form.no_lkn = this.props.lknId;
    console.log(form)
    await this.props.dispatch(createpenangkapan(token, form))
    if(!this.props.error){
      this.props.navigation.navigate('penangkapan.list')
    } else {
      console.log(this.props.error)
      return;
    }
    this.setState({ isLoading: false })
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
        <FormGroup title="BUAT PENANGKAPAN" formData={formData} defaultValue={this.state.form} onFormChange={this.onFormChange}></FormGroup>
        <Button
          title="Buat Penangkapan"
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

function mapStateToProps(state) {
  const { dashboard } = state
  return {
  }
}

export default connect(mapStateToProps)(PenangkapanNew)
