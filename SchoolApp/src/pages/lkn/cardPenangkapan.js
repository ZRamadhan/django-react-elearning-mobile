import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";

class cardPenangkapan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }

  pushDataToState = async () => {
    let dataPenangkapan = await this.props.lknData.penangkapan;
    this.setState({
      data: dataPenangkapan,
    });
  };

  componentDidMount() {
    this.pushDataToState();
  }

  render() {
    console.log("state data", this.state.data);
    return (
      <View>
        {this.state.data.map((data, i) => (
          <TouchableOpacity key={i}>
            {console.log("hasil map data", data)}
            <View style={styles.card}>
              <Text style={{ fontWeight: "bold" }}>
                {data.no_penangkapan} {"\n"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{marginBottom: 2}}>Tanggal Penangkapan: </Text>
                  <View style={styles.separator}/>
                  <Text>Masa Berakhir Penangkapan: </Text>
                </View>
                
                <View>
                  <Text style={{marginBottom: 2}}>{data.tanggal_penangkapan}</Text>
                  <View style={styles.separator}/>
                  <Text>{data.masa_berakhir_penangkapan}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#F7F7F7",
    opacity: 0.85,
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

function mapStateToProps(state) {
  const { dashboard } = state;
  return {
    lknData: dashboard.lknData,
  };
}

export default connect(mapStateToProps)(cardPenangkapan);
