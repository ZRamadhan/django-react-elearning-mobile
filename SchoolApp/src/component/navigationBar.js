import React, {Component} from 'react';
import ReactNative, { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import DatePicker from '../component/datePicker.android';
import ContentLoader from 'react-native-easy-content-loader';
import { withNavigation } from 'react-navigation';
import SearchBar from '../component/searchBar';

const {
  StyleSheet,
  View,
  Animated,
} = ReactNative;


var isHidden = false;

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1000),  //This is the initial position of the subview
      showFilter: false,
    };
  }

  _toggleSubview(value) {
    isHidden = value==='false' ? false : !isHidden;

    let toValue;
    if(isHidden) {
      toValue = 0;
    } else {
      toValue = 2000;
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
                  title={this.props.home ? "Logout" : "Back"}
                  buttonStyle={styles.buttonDisabled}
                  type="clear"
                  onPress={this.props.home 
                    ? () => this.props.navigation.navigate('login') 
                    : () => this.props.navigation.pop()}
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
              <DatePicker placeholder='Starting Date'/>
              <DatePicker placeholder='End Date'/>
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
            containerStyles={{marginLeft: 20}}
            pRows={25} pHeight={[50, 30, 20]}
           >
            <TouchableWithoutFeedback onPress={()=> {
                this._toggleSubview('false')
              }}
            >
              {this.props.children}
            </TouchableWithoutFeedback>
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

export default withNavigation(NavigationBar)
