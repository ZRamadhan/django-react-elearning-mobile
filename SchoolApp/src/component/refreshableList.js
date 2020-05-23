import React, { Component } from 'react';
import { InputGroup, Icon, Input } from 'native-base';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

class MyListItem extends React.PureComponent {
  render() {
    return (
        <View 
                style={{
                  borderWidth: 1,
                  borderRadius: 2,
                  padding:10,
                  borderColor: '#ddd',
                  borderBottomWidth: 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 3,
                  elevation: 2,
                  margin: 10,
                }}>
                  <TouchableOpacity onPress={() => null}>
                    <View style={{margin:5}}>
                      <Text 
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          justifyContent: 'center'
                        }}>
                        No LKN
                      </Text>
                      <Text 
                        style={{
                          fontSize: 13,
                          justifyContent: 'center'
                        }}>
                        {this.props.item.location.street.name}
                      </Text>
                    </View>
                    <View style={{margin:5}}>
                      <Text 
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          justifyContent: 'center'
                        }}>
                        Nama Penyidik
                      </Text>
                      <Text 
                        style={{
                          fontSize: 13,
                          justifyContent: 'center'
                        }}>
                        {this.props.item.name.first}
                      </Text>
                    </View>
                    <View style={{position:'absolute', right:5, bottom:5}}>
                      <Text 
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          justifyContent: 'center'
                        }}>
                        5 Januari 2020
                      </Text>
                    </View>
                     <View style={{position:'absolute', right:5, top:5}}>
                        <Menu>
                          <MenuTrigger>
                            <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-menu' />
                          </MenuTrigger>
                          <MenuOptions style={{backgroundColor: '#F5FCFF'}}>
                            <MenuOption onSelect={() => alert(`Save`)}>
                              <Text style={{color: 'gray', fontWeight: 'bold'}}>Edit</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => alert(`Delete`)} >
                              <Text style={{color: 'red', fontWeight: 'bold'}}>Delete</Text>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>
                  </TouchableOpacity>
                </View>
    )
  }
}

const renderItem = ({ item }) => (<MyListItem item={item} />);

export default class RefreshableList extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //user list
      error: ''
    }
  }

  componentDidMount() {
    this.fetchUser(this.page) //Method for API call
  }

   fetchUser(page) {
   //stackexchange User API url
    const url = `https://randomuser.me/api/?results=10`;
    this.setState({ loading: true })
    axios.get(url)
      .then(res => {
        let listData = this.state.data;
        let data = listData.concat(res.data.results)  //concate list with response
        this.setState({ loading: false, data: data })
      })
      .catch(error => {
        console.log('error', error)
        this.setState({ loading: false, error: 'Something just went wrong' })
      });
  }
    
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          opacity: 0.4,
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };

  renderFooter = () => {
   //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };

  handleLoadMore = () => {
    if (!this.state.loading) {
      this.page = this.page + 1; // increase page by 1
      this.fetchUser(this.page); // method for API call 
    }
  };

  onRefresh() {
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    const url = `https://randomuser.me/api/?results=10`;
    axios.get(url)
      .then(res => {
        let data = res.data.results
        this.setState({ isRefreshing: false, data: data }) // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
      })
      .catch(error => {
        this.setState({ isRefreshing: false, error: 'Something just went wrong' }) // false isRefreshing flag for disable pull to refresh
      });
  }

  render() {
      if (this.state.loading && this.page === 1) {
        return <View style={{
          width: '100%',
          height: '100%'
        }}><ActivityIndicator style={{ color: '#000' }} /></View>;
      }
      
      return (
        <View style={{ width: '100%', height: '100%' }}>
          <FlatList
            data={this.state.data}
            extraData={this.state}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            removeClippedSubviews={true} // Unmount components when outside of window 
            initialNumToRender={5} // Reduce initial render amount
            windowSize={7} // Reduce the window size
            ListFooterComponent={this.renderFooter.bind(this)}
            onEndReachedThreshold={0.5}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        </View>
      );
    }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    height: 60,
  },
});
  