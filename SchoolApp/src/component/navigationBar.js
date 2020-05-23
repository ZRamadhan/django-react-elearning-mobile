import React, {Component} from 'react';
import ReactNative, { ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
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
for(let i=0; i<26; i++){
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
      <View style={styles.container}>
          {(!hideNavbar) && (
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
                    <Icon style={{fontSize:14, color:'#517fa4', padding:5}} name='ios-menu' />
                  }
                  title="Menu"
                  raised
                  disabled={this.props.disableMenu ? true : this.props.loading}
                  onPress={()=> {
                    this.setState({showFilter: false})
                    this._toggleSubview()
                  }}
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
                    <Icon style={{fontSize:14, color:'#517fa4', padding:5}} name='ios-cloud'/>
                  }
                  raised
                  containerStyle={styles.button}
                  type="outline"
                />
            </View>
          )}
          {!this.props.hideSearch && (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('searchBar')}>
              <InputGroup style={{margin:10, marginBottom: 20}}>
                  <Icon name='ios-search' />
                  <Text style={{padding:10, width:'80%'}}>Search</Text>
                  <TouchableOpacity onPress={this._toggleFilter}><Icon name='funnel' /></TouchableOpacity>
              </InputGroup>
            </TouchableWithoutFeedback>
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
                    onPress={()=>this.props.navigation.replace('lkn.list')}
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
            containerStyles={{marginLeft: 20}}
            pRows={25}
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
