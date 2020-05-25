import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import FormGroup from '../../component/form/formGroup';
import NavigationBar from '../../component/navigationBar';

function Separator() {
  return <View style={styles.separator} />;
}

const formData = [
  {label: 'SP KAP', name: 'No Penangkapan', fieldName: 'no_penangkapan'},
  {label: 'TANGGAL PENANGKAPAN', name: 'Tanggal Penangkapan', fieldName: 'tanggal_penangkapan', type: 'date'},
  {label: 'MASA BERAKHIR PENANGKAPAN', name: 'Masa Berakhir Penangkapan', fieldName: 'masa_berakhir_penangkapan', type: 'date'},
]

class PenangkapanEdit extends React.Component {
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
          icon={<Icon style={{fontSize:15, color:'#517fa4', padding:8}} name='list' />}
          title="List Tersangka"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('tersangka.list', {
            pnkpId: this.props.selectedPnkpId,
            page: 'PenangkapanEdit'
          })}
        />
        <Button
          icon={<Icon style={{fontSize:15, color:'#517fa4', padding:8}} name='list' />}
          title="List Barang-Bukti"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('barangbukti.list', {
            pnkpId: this.props.selectedPnkpId,
            page: 'PenangkapanEdit'
          })}
        />
      </React.Fragment>
    )
    return (
      <NavigationBar hideSearch renderButton={buttonGroup} loading={this.state.loading} hideFilter>
        <SafeAreaView style={styles.container}>
        <FormGroup title="Edit Penangkapan" formData={formData}></FormGroup>
        <Button
          title="Edit Penangkapan"
          type="outline"
          containerStyle={{padding:10}}
          onPress={() => {
            this.props.navigation.pop()
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

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    selectedPnkpId: dashboard.selectedPnkpId,
  }
}

export default connect(mapStateToProps)(PenangkapanEdit)
