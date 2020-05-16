import React, { Component } from 'react';
import { InputGroup, Icon, Textarea, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

export default class TextArea extends Component {
    render() {
        return (
          <View style={styles.container}>
            <Text style={{fontSize: 14, fontWeight:'200', color:'grey'}}>Text Area</Text>
            <Textarea style={{ paddingLeft:20, paddingTop: 15, paddingBottom: 15, fontSize: 14, color: 'grey' }} rowSpan={5} bordered placeholder='Text Area' />
          </View>
        )
    }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    height: 250,
  },
});
  