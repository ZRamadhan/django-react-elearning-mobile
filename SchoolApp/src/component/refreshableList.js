import React, { Component } from 'react';
import { InputGroup, Icon, Input } from 'native-base';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { get_token } from '../helper/requestHelper'
import { get_lkn_mobile, get_tersangka_mobile, get_barangbukti_mobile } from '../reduxActions/dashboard';
import LKNCard from './card/lknCard';
import TersangkaCard from './card/tersangkaCard';
import BarangBuktiCard from './card/barangBuktiCard';

const renderLKN = ({ item }) => (<LKNCard item={item} />);
const renderTersangka = ({ item }) => (<TersangkaCard item={item} />);
const renderBarangBukti = ({ item }) => (<BarangBuktiCard item={item} />);

class RefreshableList extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.alreadyMount = false,
    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //user list
      error: null
    }
  }

  async componentDidMount() {
    this.fetchUser(this.page) //Method for API call
  }

   async fetchUser(page) {
   //stackexchange User API url
    const { lknTableData } = this.props;

    this.setState({ loading: true })
    const token = await get_token()
    let result = ''
    if(this.props.page === 'LKN'){
      result = await this.props.dispatch(get_lkn_mobile(this.page, this.state.data, token))
    } else if(this.props.page === 'TSK'){
      result = await this.props.dispatch(get_tersangka_mobile(this.page, this.state.data, token))
    } else if(this.props.page === 'BB'){
      result = await this.props.dispatch(get_barangbukti_mobile(this.page, this.state.data, token))
    }
    if(result === null){
      this.setState({ loading: false, error: true})
    } else {
      this.setState({ loading: false, data: result })
    }
    this.alreadyMount = true;
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

  async onRefresh() {
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    const { lknTableData } = this.props;

    this.setState({ isRefreshing: true })
    const token = await get_token()
    this.page = 1
    let result = '';
    if(this.props.page === 'LKN'){
      result = await this.props.dispatch(get_lkn_mobile(this.page, [], token))
    } else if(this.props.page === 'TSK'){
      result = await this.props.dispatch(get_tersangka_mobile(this.page, [], token))
    } else if(this.props.page === 'BB'){
      result = await this.props.dispatch(get_barangbukti_mobile(this.page, [], token))
    }
    this.setState({ isRefreshing: false, data: result })
  }

  render() {
      if (this.state.loading && this.page === 1) {
        return <View style={{
          width: '100%',
          height: '100%'
        }}><ActivityIndicator style={{ color: '#000' }} /></View>;
      }

      let renderItem;
      if(this.props.page === 'LKN'){
        renderItem = renderLKN;
      } else if(this.props.page === 'TSK'){
        renderItem = renderTersangka;
      } else if(this.props.page === 'BB'){
        renderItem = renderBarangBukti;
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
          />
           <Button
              title="Load more..."
              type="clear"
              icon={<Icon style={{fontSize:15, color:'#517fa4', padding:8}} name='undo' />}
              containerStyle={{padding:10}}
              onPress={()=>this.handleLoadMore()}
          />
        </View>
      );
    }
}

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    error: dashboard.error,
    lknTableData: dashboard.lknTableData,
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

export default connect(mapStateToProps)(RefreshableList)

  