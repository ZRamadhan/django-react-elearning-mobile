import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'
import { Icon } from 'native-base';
import { get_token } from '../../../helper/requestHelper';
import Constants from 'expo-constants';
import RefreshableList from '../../../component/refreshableList';
import NavigationBar from '../../../component/navigationBar';

function Separator() {
  return <View style={styles.separator} />;
}

class StatusBarangBuktiList extends React.Component {
  state = {
    loading: false,
  }

  async componentDidMount(){
    this.setState({loading:true})
    //do api call here
    const token = await get_token()
    setTimeout(() => this.setState({loading:false}), 2000);
  }

  render(){
    //refer navigation path in component navigator , buttonGroup is button that will be render in bottom animation menu
    const buttonGroup = (
      <React.Fragment>
        <Button
          title="Buat Status Barang Bukti"
          type="outline"
          icon={<Icon style={{fontSize:15, color:'#517fa4', padding:8}} name='create' />}
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('statusBB.new')}
        />
      </React.Fragment>
    )

    return (
      <NavigationBar hideSearch renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
          <Text>Ini Status Barang Bukti List</Text>
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
    marginTop: 5,
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

export default connect(mapStateToProps)(StatusBarangBuktiList)
