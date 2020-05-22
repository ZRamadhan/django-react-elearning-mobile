import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import NavigationBar from '../component/navigationBar';
import FormGroup from '../component/form/formGroup';
import { login } from '../reduxActions/dashboard';

function Separator() {
  return <View style={styles.separator} />;
}

const formData = [
  {label: 'Username', name: 'Username', fieldName: 'username'},
  {label: 'Password', name: 'Password', fieldName: 'password', type:'password'},
]

class Login extends React.Component {
  onSubmit = async() => {
    await this.props.dispatch(login())
  }

  render(){
    return (
      <NavigationBar hideSearch loading={false} hideFilter hideNavbar>
        <SafeAreaView style={styles.container}>
          <FormGroup title="Login" formData={formData}/>
          <Button
            title="Go to Dashboard"
            type="outline"
            containerStyle={{padding:10}}
            onPress={() => {
              this.onSubmit();
              this.props.navigation.navigate('lkn.list')
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

export default connect()(Login)

