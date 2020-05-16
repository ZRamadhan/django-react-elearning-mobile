import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements';

import Constants from 'expo-constants';
import NavigationBar from '../component/navigationBar';
import FormGroup from '../component/form/formGroup';

function Separator() {
  return <View style={styles.separator} />;
}

export default class Login extends React.Component {
  render(){
    const buttonGroup = (
      <Button
        title="Solid Button"
        type="outline"
        containerStyle={{padding:10}}
      />
    )
    return (
      <NavigationBar renderButton={buttonGroup} loading={false} hideFilter hideNavbar>
        <SafeAreaView style={styles.container}>
          <FormGroup/>
          <Button
            title="Go to Dashboard"
            type="outline"
            containerStyle={{padding:10}}
            onPress={() => this.props.navigation.navigate('lkn.list')}
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
    zIndex: 1,
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