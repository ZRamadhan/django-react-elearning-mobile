import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Constants from 'expo-constants';
import NavigationBar from '../../component/navigationBar';

function Separator() {
  return <View style={styles.separator} />;
}

export default class LKNLIST extends React.Component {
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
          title="BUAT LKN"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('lkn.new')}
        />
        <Button
          title="LIST PENANGKAPAN"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('penangkapan.list')}
        />
        <Button
          title="LIST TERSANGKA"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('tersangka.list')}
        />
        <Button
          title="LIST BARANG BUKTI"
          type="outline"
          containerStyle={{padding:10}}
          onPress={()=>this.props.navigation.navigate('barangbukti.list')}
        />
      </React.Fragment>
    )

    return (
      <NavigationBar renderButton={buttonGroup} loading={this.state.loading} home>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Ini LKN List
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
