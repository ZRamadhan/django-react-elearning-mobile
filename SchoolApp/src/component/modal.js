import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import { Icon } from 'native-base';

const App = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <React.Fragment>
    <View style={styles.centeredView}>
      <Modal
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {props.children}
             <TouchableOpacity
                style={{position:'absolute', top:5, left:5}}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                 <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='close' />
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
   <TouchableHighlight
      style={styles.openButton}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableHighlight>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
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
