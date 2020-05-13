import React, {Component} from 'react';
import ReactNative, { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { Divider } from 'react-native-elements';

const {
  StyleSheet,
  View,
  Animated
} = ReactNative;


var isHidden = true;

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1000),  //This is the initial position of the subview
      buttonText: "Show Subview"
    };
  }

  _toggleSubview() {    
    this.setState({
      buttonText: !isHidden ? "Show Subview" : "Hide Subview"
    });

    var toValue = 2000;

    if(isHidden) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 5,
        friction: 6,
      }
    ).start();

    isHidden = !isHidden;
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{
            height: 80,
            backgroundColor: 'white',
            flexDirection: "row",
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
             <Button
                icon={
                  <Icon
                    name='navicon'
                    type='evilicon'
                    color='#517fa4'
                  />
                }
                title="Menu"
                raised
                onPress={()=> {this._toggleSubview()}}
                containerStyle={styles.button}
                type="outline"
              />
              <Button
                title="Logout"
                buttonStyle={styles.buttonDisabled}
                type="clear"
              />
              <Button
                title="Notification"
                icon={
                  <Icon
                    name='bell'
                    type='evilicon'
                    color='#517fa4'
                  />
                }
                raised
                containerStyle={styles.button}
                type="outline"
              />
          </View>
          <Animated.View
            style={[styles.subView,
              {transform: [{translateY: this.state.bounceValue}]}]}
          >
            <Divider style={{ backgroundColor: 'blue' }} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.props.renderButton}
            </ScrollView>
          </Animated.View>
          {this.props.children}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 40
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  buttonDisabled: {
    padding: 8,
  },
  subView: {
    position: "absolute",
    bottom: 0,
    marginTop: 10,
    zIndex: 1000,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 250,
  }
});

