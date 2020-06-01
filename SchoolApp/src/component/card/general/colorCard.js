import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const actualDimensions =  {
  height:  (height<width) ? width : height,
  width: (width>height) ? height : width
};

class ColorCard extends React.Component {
  render() {
    if(this.props.type==='slim'){
      return (
        <TouchableOpacity onPress={this.props.onPress} style={{flex:1, alignItems:'center', backgroundColor:this.props.color, margin:5, padding:10, height:120, borderRadius:20, width:actualDimensions.width/2.3}}>
          <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>{this.props.top}</Text>
          <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>{this.props.middle}</Text>
          <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>{this.props.bottom}</Text>
        </TouchableOpacity>
      )
    }
    
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{flex:1, alignItems:'center', backgroundColor:this.props.color, margin:5, padding:10, height:120, borderRadius:20}}>
        <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>{this.props.top}</Text>
        <Text style={{fontSize:18, fontWeight:'bold', color:'white', padding:5}}>{this.props.middle}</Text>
        <Text style={{fontSize:15, fontWeight:'bold', color:'#4296C9', padding:5}}>{this.props.bottom}</Text>
      </TouchableOpacity>
    )
  }
}

export default ColorCard;
