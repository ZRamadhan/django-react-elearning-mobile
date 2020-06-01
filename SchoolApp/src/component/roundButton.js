import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text
} from "react-native";

import { Icon } from 'native-base';

const App = (props) => {
  return (
   <TouchableOpacity
      style={styles.openButton}
      onPress={props.onPress}
    >
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#A5DDFC",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    width: 140,
    height: 40,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
