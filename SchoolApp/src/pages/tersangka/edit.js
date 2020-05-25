import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import FormGroup from '../../component/form/formGroup';

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

export default class TersangkaEdit extends React.Component {
  state = {
    loading: false,
  }

  componentDidMount(){
    this.setState({loading:true})
    //do api call here
    setTimeout(() => this.setState({loading:false}), 2000);
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
        <FormGroup title={`Edit Tersangka-${this.props.id}`} formData={formData}/>
        <Button
          title="Edit Tersangka"
          type="outline"
          containerStyle={{padding:10}}
          onPress={() => {
            this.props.navigation.navigate('tersangka.list')
          }}
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
