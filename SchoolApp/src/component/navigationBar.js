import React, {Component} from 'react';
import ReactNative, { ScrollView, TouchableWithoutFeedback, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { InputGroup, Text, Icon } from 'native-base';
import DatePicker from '../component/datePicker.android';
import ContentLoader from 'react-native-easy-content-loader';
import { withNavigation } from 'react-navigation';
import SearchBar from '../component/searchBar';

const {
  StyleSheet,
  View,
  Animated,
} = ReactNative;

const data = []
for(let i=0; i<30; i++){
  data.push('90%')
}

var isHidden = false;

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1000),  //This is the initial position of the subview
      showFilter: false,
      hideContent: false,
    };
  }

  _toggleFilter = () => {
    this.setState({showFilter:true});
    this._toggleSubview()
  }

  _onSearchFocus = () => {
    this.setState({ hideContent: true })
  }

  _onSearchBlur = () => {
    this.setState({ hideContent: false }) 
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
    const hideNavbar = this.props.hideNavbar ? true : this.state.hideContent
    return (
      <ImageBackground source={require('../assets/background_mobile.png')} style={{flex: 1, resizedMode: 'cover', justifyContent: 'center'}}>
      <View style={styles.container}>
          {(!hideNavbar) && (
            <View style={{
              flex: 0.1,
              height: 60,
              flexDirection: "row",
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 15,
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10
            }}>
              <Button
                  icon={
                    <Icon style={{fontSize:14, color:'#517fa4', padding:5}} name='ios-menu' />
                  }
                  title="Menu"
                  raised
                  disabled={this.props.disableMenu ? true : this.props.loading}
                  onPress={()=> {
                    this.setState({showFilter: false})
                    this._toggleSubview()
                  }}
                  type="outline"
                />
                <Button
                  title="Notification"
                  icon={
                    <Icon style={{fontSize:14, color:'#517fa4', padding:5}} name='ios-cloud'/>
                  }
                  raised
                  type="outline"
                />
                <Button
                  title={this.props.home ? "Logout" : "Back"}
                  raised
                  type="outline"
                  onPress={this.props.home 
                    ? () => this.props.navigation.navigate('login') 
                    : () => this.props.navigation.pop()}
                />
            </View>
          )}
          <Animated.View
            style={[styles.subView,
              {transform: [{translateY: this.state.bounceValue}]}]}
          >
            {this.state.showFilter && (
              <ScrollView>
                <DatePicker placeholder='Starting Date'/>
                <DatePicker placeholder='End Date'/>
                <View style={{width:'100%', marginTop:10, flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Button
                      title="Dari Yang Terbaru"
                      icon={
                        <Icon style={{fontSize:14, color:'#517fa4', padding:5}} name='funnel' />
                      }
                      raised
                      containerStyle={styles.buttonFilter}
                      type="outline"
                  />
                  <Button
                      title="Dari Yang Terlama"
                      icon={
                        <Icon style={{fontSize:14, color:'#517fa4', padding:5}} name='funnel' />
                      }
                      raised
                      containerStyle={styles.buttonFilter}
                      type="outline"
                  />
                </View>
                <Button
                    title="Bersihkan Filter"
                    icon={
                      <Icon style={{fontSize:14, color:'#517fa4', padding:5}} name='ios-close' />
                    }
                    buttonStyle={{
                      borderColor:'red'
                    }}
                    raised
                    containerStyle={{padding:10, margin:10}}
                    type="outline"
                />
              </ScrollView>
            )}
            {!this.state.showFilter && (
              <React.Fragment>
                {!this.props.isHome && (
                  <Button
                    title="Back To Home"
                    type="outline"
                    icon={<Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-home' />}
                    containerStyle={styles.buttonFilter}
                    onPress={()=>this.props.navigation.replace('dashboard')}
                  />
                )}
                <ScrollView showsVerticalScrollIndicator={false}>
                  {this.props.renderButton}              
                </ScrollView>
              </React.Fragment> 
            )}
          </Animated.View>
          <ContentLoader
            active
            loading={this.props.loading}
            containerStyles={{marginTop:30,marginLeft: 20}}
            pRows={30}
            pWidth={data}
           >
            {!this.state.hideContent && (
              <TouchableWithoutFeedback onPress={()=> {
                  this._toggleSubview('false')
                }}
              >
                {this.props.children}
              </TouchableWithoutFeedback>
            )}
           </ContentLoader>
      </View>
      </ImageBackground>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 40
  },
  // button: {
  //   // padding: 8,
  // },
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
