import React, { Component } from 'react';
import { InputGroup, Icon, Input, ListItem, List, Body, Text } from 'native-base';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { setKeyword } from '../reduxActions/dashboard';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class SearchBar extends Component {
    state = {
      hideFilter: false,
      keyword: '',
    }
    render() {
        const keyword = this.state.keyword === '' ? '-' : this.state.keyword; 
        return (
            <View>
                <Button
                  icon={{
                    name: "ac-unit",
                    size: 15,
                    color: "white"
                  }}
                  containerStyle={{marginTop:40}}
                  title="Close"
                  onPress={this.props.onClose}
                />
                <InputGroup style={styles.container}>
                    <Icon name='ios-search' />
                    <Input placeholder='Search'
                        onChangeText={ (text) => {
                          this.setState({ keyword: text }) 
                          this.props.dispatch(setKeyword(text));
                        }}
                        onFocus={() => {
                            this.setState({hideFilter: true})
                            }
                        }
                        onBlur={() => {
                            this.setState({hideFilter: false})
                        }}
                    />
                </InputGroup>
                {this.state.hideFilter && (
                    <React.Fragment>
                        <ListItem onPress={() => this.props.navigation.replace('lkn.list')}>
                            <Body>
                                <Text style={{ fontSize: 14, color: 'black' }}>{keyword}</Text>
                                <Text style={{ fontSize: 12, color: 'grey' }}>di Halaman List LKN</Text>
                            </Body>
                            <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-share' />
                        </ListItem>
                        <ListItem onPress={() => this.props.navigation.replace('penangkapan.list')}>
                            <Body>
                                <Text style={{ fontSize: 14, color: 'black' }}>{keyword}</Text>
                                <Text style={{ fontSize: 12, color: 'grey' }}>di Halaman List Penangkapan</Text>
                            </Body>
                            <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-share' />
                        </ListItem>
                        <ListItem onPress={() => this.props.navigation.replace('tersangka.list')}>
                            <Body>
                                <Text style={{ fontSize: 14, color: 'black' }}>{keyword}</Text>
                                <Text style={{ fontSize: 12, color: 'grey' }}>di Halaman List Tersangka</Text>
                            </Body>
                            <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-share' />
                        </ListItem>
                        <ListItem onPress={() => this.props.navigation.replace('barangbukti.list')}>
                            <Body>
                                <Text style={{ fontSize: 14, color: 'black' }}>{keyword}</Text>
                                <Text style={{ fontSize: 12, color: 'grey' }}>di Halaman List Barang Bukti</Text>
                            </Body>
                            <Icon style={{fontSize:20, color:'#517fa4', padding:5}} name='ios-share' />
                        </ListItem>
                    </React.Fragment>
                )}
            </View>
        )
    }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginRight: 15,
    marginLeft: 15,
    height: 35,
  },
});

export default connect()(withNavigation(SearchBar));

  