import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import ContentLoader from 'react-native-easy-content-loader';
import { InputGroup, Text, Icon } from 'native-base';
import ColorCard from '../component/card/general/colorCard';
import { Button } from 'react-native-elements';
import RoundButton from '../component/roundButton';
import SearchBar from '../component/searchBar';
import DatePicker from '../component/datePicker.android';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { get_token } from '../helper/requestHelper';
import NavigationBar from '../component/navigationBar';
import Modal from '../component/modal';
import { setFilter } from '../reduxActions/dashboard';
import moment from 'moment';

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
    page: FILTER.All,
    today: moment(new Date()).format("DD-MM-YYYY"),
    form: {
      startDate: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("DD-MM-YYYY"),
      endDate: moment(new Date()).format("DD-MM-YYYY"),
    }
  }
 
  onFormChange = (fieldName, e) => {
    const formObj = {...this.state.form};
    formObj[fieldName] = e
    this.setState({
      form: formObj,
    })
  }

  async componentDidMount(){
    this.setState({loading:true})
    //do api call here
    this.props.dispatch(setFilter('ALL', this.state.form.startDate, this.state.form.endDate))
    const token = await get_token()
    setTimeout(() => this.setState({loading:false}), 2000);
  }

  render(){
    const appliedDate = this.state.page === FILTER.All 
      ? `${this.state.form.startDate} s/d ${this.state.form.endDate}` : this.state.today
    const filteredString = `Applied Filter:\n ${appliedDate}`
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
                <Text style={{fontSize:20, fontWeight: 'bold', color: '#543C7E'}}>Mr Admin</Text>
                <Text style={{fontSize:15, color: 'gray'}}>22 mei 2020</Text>
              </View>
            </View>
            <View style={{padding:10}}>
              <Text style={{fontSize:30, fontWeight: 'bold', color: '#543C7E'}}>Dashboard</Text>
            </View>
            <TouchableOpacity 
              style={{justifyContent:'center', alignItems:'center', backgroundColor:'#A5DDFC', height:40, borderRadius:20, width:100}}
              onPress={() => this.props.navigation.navigate('lkn.new')}
            >
              <Text style={{fontWeight:'bold', color:'gray'}}>Buat Berkas</Text>
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
                this.props.dispatch(setFilter('TODAY', null, null))
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
            {this.state.page === FILTER.All && (
              <Modal title='Show Date Filter'>
                <React.Fragment>
                  <DatePicker fieldName='startDate' onFormChange={this.onFormChange} placeholder='Dari Tanggal'/>
                  <DatePicker fieldName='endDate' onFormChange={this.onFormChange} placeholder='Sampai Tanggal'/>
                  <RoundButton title='Terapkan Filter' onPress={() => {
                    this.setState({loadingContent: true})
                    this.props.dispatch(setFilter('ALL', this.state.form.startDate, this.state.form.endDate))
                    setTimeout(() => this.setState({loadingContent:false}), 1000);
                  }}/>
                </React.Fragment>
              </Modal>
            )}
            <Text style={{fontSize:12, fontWeight:'bold', color:'gray', padding:10}}>{filteredString}</Text>
            <ScrollView>
            <ContentLoader
              active
              loading={this.state.loadingContent}
              containerStyles={{margin: 5}}
              pRows={10}
              pWidth={250}
            >
                <View style={{flexDirection:'row'}}>
                  <ColorCard 
                    top='20 Berkas' middle='Berkas LKN' bottom='Ditemukan' color='#A5DDFC'
                    onPress={() => this.props.navigation.navigate('lkn.list')}
                  />
                  <ColorCard 
                    top='20 Berkas' middle='Penangkapan' bottom='Ditemukan' color='#B9B3F4'
                    onPress={() => this.props.navigation.navigate('penangkapan.list')}
                  />
                </View>
                <View style={{flexDirection:'row'}}>
                  <ColorCard 
                    top='20 Berkas' middle='Tersangka' bottom='Ditemukan' color='#A5DDFC'
                    onPress={() => this.props.navigation.navigate('tersangka.list')}
                  />
                  <ColorCard 
                    top='20 Berkas' middle='Barang Bukti' bottom='Ditemukan' color='#B9B3F4'
                    onPress={() => this.props.navigation.navigate('barangbukti.list')}
                  />
                </View>
                <View>
                  <Text style={{padding:5, fontSize:15, color: '#543C7E'}}>Latest Update</Text>
                  <ColorCard top='5 minutes ago' middle='LKN' bottom='22 Mei 2020' color='#A5DDFC'/>
                  <ColorCard top='10 minutes ago' middle='Penangkapan' bottom='22 Mei 2020' color='#B9B3F4'/>
                  <ColorCard top='20 minutes ago' middle='Tersangka' bottom='22 Mei 2020' color='#A5DDFC'/>
                  <ColorCard top='25 minutes ago' middle='Barang Bukti' bottom='22 Mei 2020' color='#B9B3F4'/>
                </View>
            </ContentLoader>
            </ScrollView>
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

