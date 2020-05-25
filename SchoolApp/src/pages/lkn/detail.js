import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import { get_lkn_detail } from '../../reduxActions/dashboard';
import { get_token } from '../../helper/requestHelper';

function Separator() {
  return <View style={styles.separator} />;
}

class LKNDetail extends React.Component {
  state = {
    loading: false,
  }

  async componentDidMount(){
    this.setState({loading:true})
    //do api call here
    const token = await get_token()
    await this.props.dispatch(get_lkn_detail(token, this.props.id))
    this.setState({loading:false})
  }

  render(){
    console.log(this.props.lknData)
    //refer navigation path in component navigator , buttonGroup is button that will be render in bottom animation menu
    const buttonGroup = (
      <Button
        title="List Penangkapan"
        type="outline"
        icon={<Icon style={{fontSize:15, color:'#517fa4', padding:8}} name='list' />}
        containerStyle={{padding:10}}
        onPress={()=>this.props.navigation.navigate('penangkapan.list', {lknId: this.props.id})}
       />
    )
    return (
      <NavigationBar hideSearch renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Ini LKN Detail - - {this.props.id}
        </Text>
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
    lknData: dashboard.lknData,
  }
}

export default connect(mapStateToProps)(LKNDetail)
