import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import ContentLoader from 'react-native-easy-content-loader';
import { InputGroup, Text, Icon } from 'native-base';
import { Button } from 'react-native-elements';
import SearchBar from '../component/searchBar';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { get_token } from '../helper/requestHelper';
import NavigationBar from '../component/navigationBar';
import { login } from '../reduxActions/dashboard';

function Separator() {
  return <View style={styles.separator} />;
}

const FILTER = {
  All: 'Semua',
  Today: 'HariIni',
  Pending: 'Pending',
  Search: 'Search',
}

class Dashboard extends React.Component {
  state = {
    loading: false,
    loadingContent: false,
    page: FILTER.All
  }
 
  async componentDidMount(){
    this.setState({loading:true})
    //do api call here
    const token = await get_token()
    setTimeout(() => this.setState({loading:false}), 2000);
  }

  onSubmit = async() => {
    await this.props.dispatch(login())
  }

  render(){
    if(this.state.page !== FILTER.Search){
      return (
      <NavigationBar home disableMenu isHome hideSearch loading={this.state.loading} hideFilter>
        <SafeAreaView style={styles.container}>
          <View style={{flex:1, backgroundColor: 'white', borderRadius:20, padding:10}}>
            <View style={{flexDirection:'row'}}>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri:
                    'https://www.clipartmax.com/png/middle/34-340027_user-login-man-human-body-mobile-person-comments-person-icon-png.png',
                }}
              />
              <View style={{padding:10}}>
                <Text style={{fontSize:20, fontWeight: 'bold', color: '#543C7E'}}>Hi .., Mr Admin</Text>
                <Text style={{fontSize:15, color: 'gray'}}>22 mei 2020</Text>
              </View>
            </View>
            <View style={{padding:10}}>
              <Text style={{fontSize:30, fontWeight: 'bold', color: '#543C7E'}}>Dashboard</Text>
            </View>
            <TouchableOpacity style={{alignItems:'center', backgroundColor:'#A5DDFC', height:20, width:100}}>
              <Text>Buat Berkas</Text>
            </TouchableOpacity>
            <View style={{padding:10, flexDirection:'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => {
                this.setState({loadingContent:true, page: FILTER.All})
                setTimeout(() => this.setState({loadingContent:false}), 1000);
              }}>
                <Text style={this.state.page === FILTER.All ? styles.selectedMenu : styles.menu}>Semua</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.setState({loadingContent:true, page: FILTER.Today})
                setTimeout(() => this.setState({loadingContent:false}), 1000);
              }}>
                <Text style={this.state.page === FILTER.Today ? styles.selectedMenu : styles.menu}>Hari Ini</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.setState({loadingContent:true, page: FILTER.Pending})
                setTimeout(() => this.setState({loadingContent:false}), 1000);
              }}>
                <Text style={this.state.page === FILTER.Pending ? styles.selectedMenu : styles.menu}>Pending</Text>
              </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={() => this.setState({page: FILTER.Search})}>
              <InputGroup style={{margin:10, marginBottom: 20}}>
                  <Icon name='ios-search' />
                  <Text style={{padding:10, width:'80%'}}>Search</Text>
              </InputGroup>
            </TouchableWithoutFeedback>
            <ContentLoader
              active
              loading={this.state.loadingContent}
              containerStyles={{margin: 5}}
              pRows={10}
              pWidth={250}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:1, alignItems:'center', backgroundColor:'#A5DDFC', margin:5, padding:10, height:120, width:120, borderRadius:20}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>20 Berkas</Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>Berkas LKN</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>22 Mei 2020</Text>
                  </View>
                  <View style={{flex:1, alignItems:'center', backgroundColor:'#B9B3F4', margin:5, padding:10, height:120, width:120, borderRadius:20}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>20 Berkas</Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>Penangkapan</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>22 Mei 2020</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity style={{flex:1, alignItems:'center', backgroundColor:'#A5DDFC', margin:5, padding:10, height:120, width:120, borderRadius:20}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>20 Berkas</Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>Tersangka</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>22 Mei 2020</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1, alignItems:'center', backgroundColor:'#B9B3F4', margin:5, padding:10, height:120, width:120, borderRadius:20}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>20 Berkas</Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>Barang-Bukti</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>22 Mei 2020</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{padding:5, fontSize:15, color: '#543C7E'}}>Latest Update</Text>
                  <View style={{flex:1, alignItems:'center', backgroundColor:'#A5DDFC', margin:5, padding:10, height:120, borderRadius:20}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>5 minutes ago</Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>Berkas LKN</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>by agarez</Text>
                  </View>
                  <View style={{flex:1, alignItems:'center', backgroundColor:'#A5DDFC', margin:5, padding:10, height:120, borderRadius:20}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>10 minutes ago</Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>Penangkapan</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>by RibonRed</Text>
                  </View>
                  <View style={{flex:1, alignItems:'center', backgroundColor:'#A5DDFC', margin:5, padding:10, height:120, borderRadius:20}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>10 minutes ago</Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>Tersangka</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>by Agurez</Text>
                  </View>
                  <View style={{flex:1, alignItems:'center', backgroundColor:'#A5DDFC', margin:5, padding:10, height:120, borderRadius:20}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>10 minutes ago</Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>Barang-Bukti</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>by Agurez</Text>
                  </View>
                </View>
              </ScrollView>
            </ContentLoader>
          </View>
        </SafeAreaView>
      </NavigationBar>
      )
    }
    return (
      <React.Fragment>
        <SearchBar onClose={()=>this.setState({page:FILTER.All})}/>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    marginTop: 4,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    fontSize:15, 
    fontWeight: '200', 
    color: 'gray'
  }, 
  selectedMenu: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray'
  }
});

export default connect()(Dashboard)

