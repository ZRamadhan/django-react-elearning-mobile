import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import RefreshableList from '../../component/refreshableList';

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
    setTimeout(() => this.setState({loading:false}), 2000);
  }

  render(){
    //refer navigation path in component navigator , buttonGroup is button that will be render in bottom animation menu
    const buttonGroup = (
      <React.Fragment>
        <Button
          title="BUAT BARANG BUKTI"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('barangbukti.new')}
        />
      </React.Fragment>
    )
    if(this.props.pnkpId){
      return (
        this.props.page === 'PenangkapanDetail' ? 
          <NavigationBar disableMenu hideSearch renderButton={buttonGroup} loading={this.state.loading}>
            <SafeAreaView style={styles.container}>
              <RefreshableList paginationOff page='BB' pnkpId={this.props.pnkpId} pageActive={this.props.page}/>
            </SafeAreaView>
          </NavigationBar>
         : 
          <NavigationBar hideSearch renderButton={buttonGroup} loading={this.state.loading}>
            <SafeAreaView style={styles.container}>
              <RefreshableList paginationOff page='BB' pnkpId={this.props.pnkpId} pageActive={this.props.page}/>
            </SafeAreaView>
          </NavigationBar>
      )
    }
    return (
      <NavigationBar renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
          <RefreshableList page='BB'/>
        </SafeAreaView>
      </NavigationBar>
    )
  }
}

function mapStateToProps(state) {
  const { dashboard } = state
  console.log(dashboard.bbTableData)
  return {
    error: dashboard.error,
    bbTableData: dashboard.bbTableData,
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

export default connect(mapStateToProps)(StatusBarangBuktiList)
