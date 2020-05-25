import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements'
import { Icon } from 'native-base';
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';
import RefreshableList from '../../component/refreshableList';

function Separator() {
  return <View style={styles.separator} />;
}

export default class PenangkapanList extends React.Component {
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
          title="Buat Penangkapan"
          type="outline"
          icon={<Icon style={{fontSize:15, color:'#517fa4', padding:8}} name='create' />}
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('penangkapan.new')}
        />
      </React.Fragment>
    )
    return (
      <NavigationBar hideSearch renderButton={buttonGroup} loading={this.state.loading}>
        <SafeAreaView style={styles.container}>
          <RefreshableList page="PNKP" paginationOff />  
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
