import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import { get_tersangka_list } from '../../reduxActions/dashboard';
import RefreshableList from '../../component/refreshableList'
function Separator() {
}

class TersangkaList extends React.Component {
  state = {
    loading: false,
  }

  async componentDidMount(){
    this.setState({loading:true})
    //do api call here
    const token = await get_token()
    await this.props.dispatch(get_tersangka_list(token, null, null, 1))
    this.setState({loading:false})
    // setTimeout(() => this.setState({loading:false}), 2000);
  }

  render(){
    //refer navigation path in component navigator , buttonGroup is button that will be render in bottom animation menu
    const buttonGroup = (
      <React.Fragment>
         <Button
          title="BUAT TERSANGKA"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('tersangka.new')}
        />
        <Button
          title="EDIT TERSANGKA"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('tersangka.edit')}
        />
      </React.Fragment>
    )
    return (
      <NavigationBar renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
          <RefreshableList page='TSK'/>
        </SafeAreaView>
      </NavigationBar>
    )
  }
}

function mapStateToProps(state) {
  const { dashboard } = state
  console.log(dashboard.tersangkaTableData)
  return {
    error: dashboard.error,
    lknTableData: dashboard.tersangkaTableData,
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

export default connect(mapStateToProps)(TersangkaList)
