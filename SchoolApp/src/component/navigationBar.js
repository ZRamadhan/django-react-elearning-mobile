import React, {Component} from 'react';
import ReactNative, { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import DatePicker from '../component/datePicker.android';
import ContentLoader from 'react-native-easy-content-loader';
import SearchBar from '../component/searchBar';

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
      buttonText: "Show Subview",
      showFilter: false,
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
          {!this.props.hideNavbar && (
            <View style={{
              height: 60,
              backgroundColor: 'white',
              flexDirection: "row",
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 15,
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
                  disabled={this.props.loading}
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
          )}
          {this.state.showFilter && (
            <View>
              <SearchBar />
              <DatePicker placeholder='starting date'/>
              <DatePicker placeholder='end date'/>
              <Button
                  title="Apply Filter"
                  icon={
                    <Icon
                      name='gear'
                      type='evilicon'
                      color='#517fa4'
                    />
                  }
                  raised
                  containerStyle={styles.buttonFilter}
                  type="outline"
              />
            </View>
          )}
          <Animated.View
            style={[styles.subView,
              {transform: [{translateY: this.state.bounceValue}]}]}
          >
            {!this.props.hideFilter &&
                <Button
                  title={!this.state.showFilter ? "Show Filter" : "Hidden Filter"}
                  icon={
                    <Icon
                      name={!this.state.showFilter ? "eye" : "close"}
                      type='evilicon'
                      color='#517fa4'
                    />
                  }
                  raised
                  onPress={()=> {
                    this.setState(prevState => ({
                      showFilter: !prevState.showFilter
                    }));
                  }}
                  containerStyle={styles.button}
                  type="outline"
                />
              }
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.props.renderButton}              
            </ScrollView>
          </Animated.View>
          <ContentLoader
            active
            loading={this.props.loading}
            avatar pRows={25} pHeight={[50, 30, 20]}
           >
            {this.props.children}
           </ContentLoader>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 35
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  buttonFilter: {
    padding: 8,
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

