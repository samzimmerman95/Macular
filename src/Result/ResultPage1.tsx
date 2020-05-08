import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ResultGrid from "./ResultGrid";
import firebase from "../../firebase/firebaseSetup";
import * as Constants from "../../Constants";

const width = Dimensions.get("window").width;

export default class ResultPage1 extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataExists: this.props.navigation.getParam("dataExists", false),
      leftGrids: this.props.navigation.getParam("leftGrids"),
      rightGrids: this.props.navigation.getParam("rightGrids"),
      eye: "Left",
      testDates: this.props.navigation.getParam("testDates"),
    };
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.view}>
        <ResultGrid data={item.value} key={item.key} />
        <Text style={Constants.BUTTONTEXT.buttonText}>
          {this.state.testDates[item.key]}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.dataExists ? (
          <View style={styles.container}>
            <View style={styles.upper}>
              <Text style={styles.title}>{this.state.eye} Eye Results</Text>
              {this.state.eye == "Left" ? (
                <FlatList
                  scrollEnabled={true}
                  horizontal={true}
                  style={styles.scrollContainer}
                  pagingEnabled={true}
                  decelerationRate={0}
                  snapToInterval={width}
                  snapToAlignment={"center"}
                  data={this.state.leftGrids}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.key.toString()}
                />
              ) : (
                // This view that's here and not above makes the switching work...
                <View>
                  <FlatList
                    scrollEnabled={true}
                    horizontal={true}
                    style={styles.scrollContainer}
                    pagingEnabled={true}
                    decelerationRate={0}
                    snapToInterval={width}
                    snapToAlignment={"center"}
                    data={this.state.rightGrids}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.key.toString()}
                  />
                </View>
              )}
            </View>
            <View style={styles.belowScroll}>
              <TouchableOpacity
                style={[
                  this.state.eye == "Left"
                    ? styles.selectedButton
                    : styles.button,
                ]}
                onPress={() => this.setState({ eye: "Left" })}
              >
                <Text style={Constants.BUTTONTEXT.buttonText}> Left </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  this.state.eye == "Right"
                    ? styles.selectedButton
                    : styles.button,
                ]}
                onPress={() => this.setState({ eye: "Right" })}
              >
                <Text style={Constants.BUTTONTEXT.buttonText}> Right </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.textInstructions}>
            Go to the Test tab to complete your first test!
          </Text>
        )}

        {/* <View style={styles.belowScroll}>
          <TouchableOpacity
            style={[
              this.state.eye == "Left" ? styles.selectedButton : styles.button,
            ]}
            onPress={() => this.setState({ eye: "Left" })}
          >
            <Text> Left </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state.eye == "Right" ? styles.selectedButton : styles.button,
            ]}
            onPress={() => this.setState({ eye: "Right" })}
          >
            <Text> Right </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => this.props.navigation.navigate("ResultLoad")}
        >
          <Text> Refresh </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {},
  upper: {
    flex: 3,
    backgroundColor: "#abc",
    // marginTop: 40,
    // height: Dimensions.get("window").width + 40,
    // alignItems: "center",
    // justifyContent: "flex-start",
  },
  belowScroll: {
    flex: 1,
    // marginTop: 30,
    flexDirection: "row",
  },
  grid: {
    // flexDirection: 'row',
    backgroundColor: "#000",
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
  },
  view: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    // backgroundColor: "orange",
    width: width - 20,
    marginLeft: 10,
    marginRight: 10,
    height: width - 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: Constants.LIGHTGRAY,
    height: 50,
    width: (Dimensions.get("window").width - 50) / 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Constants.BORDERRADIUS,
    marginLeft: 5,
    marginRight: 5,
  },
  selectedButton: {
    backgroundColor: Constants.LIGHTGRAY,
    height: 50,
    width: (Dimensions.get("window").width - 50) / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: Constants.BORDERRADIUS,
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    fontSize: Constants.FONTSIZE,
    marginBottom: 5,
    fontWeight: Constants.BOLDFONT,
    alignSelf: "center",
  },
  textInstructions: {
    fontSize: Constants.FONTSIZE,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  instructions: {
    alignItems: "center",
    justifyContent: "center",
  },
  refreshButton: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 100,
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 30,
    borderRadius: Constants.BORDERRADIUS,
  },
});
