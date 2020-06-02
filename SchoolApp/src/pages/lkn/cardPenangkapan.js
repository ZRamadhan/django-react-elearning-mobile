import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";

class cardPenangkapan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      dataMapTersangka: [],
    };
  }

  pushDataToState = async () => {
    let dataPenangkapan = await this.props.lknData.penangkapan;
    let mapDataTersangka = dataPenangkapan.map((penangkapan) => {
      this.setState({
        dataMapTersangka: penangkapan,
      });
    });
    this.setState({
      data: dataPenangkapan,
    });
  };

  deleteSomeTersangkaPhotos = () => {};

  componentDidMount() {
    this.pushDataToState();
  }

  render() {
    console.log("state data", this.state.data);
    console.log("data map tersangka", this.state.dataMapTersangka);
    return (
      <View>
        {this.state.data.map((data, i) => (
          <TouchableOpacity key={i}>
            {/* {console.log("hasil map data", data)} */}
            {/* {this.setState({dataTersangka: data})} */}
            <View style={styles.card}>
              <Text style={{ fontWeight: "bold" }}>
                {data.no_penangkapan} {"\n"}
              </Text>
              <View style={styles.rowDirection}>
                <View>
                  <Text style={{ marginBottom: 2 }}>Tanggal Penangkapan: </Text>
                  <View style={styles.separator} />
                  <Text>Masa Berakhir Penangkapan: </Text>
                </View>

                <View>
                  <Text style={{ marginBottom: 2 }}>
                    {data.tanggal_penangkapan}
                  </Text>
                  <View style={styles.separator} />
                  <Text>{data.masa_berakhir_penangkapan}</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', paddingTop: 5}}>
                {data.penangkapan_tersangka.map((tersangka, i) => (
                    <View key={i} style={styles.fotoTersangka}>
                      <Image
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                        source={
                          tersangka.foto == null ||
                          tersangka.foto == "" ||
                          tersangka.foto == undefined
                            ? require("../../assets/no_picture.png")
                            : { uri: `${tersangka.foto}` }
                        }
                      />
                  </View>
                ))}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 7,
    backgroundColor: "#F7F7F7",
    opacity: 0.85,
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  rowDirection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fotoTersangka: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
});

function mapStateToProps(state) {
  const { dashboard } = state;
  return {
    lknData: dashboard.lknData,
  };
}

export default connect(mapStateToProps)(cardPenangkapan);
