import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";

class FormLogin extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>

        <Button>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }
}

export default FormLogin;
