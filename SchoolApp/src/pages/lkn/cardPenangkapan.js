import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from "react-redux";
import { get_lkn_detail } from "../../reduxActions/dashboard";
import { get_token } from "../../helper/requestHelper";

class cardPenangkapan extends Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    //do api call here
    const token = await get_token();
    await this.props.dispatch(get_lkn_detail(token, this.props.id));
    this.setState({ loading: false });
  }

  penangkapan = () => {
    let dataPenangkapan = this.props.lknData.penangkapan
    dataPenangkapan.map((data, i) => {
      <Text>
        
      </Text>
    })
  }

  render() {
    console.log('lkn data', this.props.lknData)
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const { dashboard } = state;
  return {
    lknData: dashboard.lknData,
  };
}

export default connect(mapStateToProps)(cardPenangkapan)
