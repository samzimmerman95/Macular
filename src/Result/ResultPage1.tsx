import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  PixelRatio,
} from "react-native";
import ResultGrid from "./ResultGrid";
import firebase from "../../firebase/firebaseSetup";
import * as Constants from "../../Constants";
import { Header } from "react-native/Libraries/NewAppScreen";

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
                  // style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContainer}
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
                <View style={styles.container}>
                  <FlatList
                    scrollEnabled={true}
                    horizontal={true}
                    // style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContainer}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollContainer: {
    // backgroundColor: "yellow",
  },
  upper: {
    // flex: 4, //7
    // backgroundColor: "#abc",
    height: width + 45 + 40 * PixelRatio.getFontScale(),
    // alignItems: "center",
    // justifyContent: "flex-start",
  },
  belowScroll: {
    flex: 1, //3
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#345",
  },
  view: {
    alignItems: "center",
    // alignSelf: "center",
    justifyContent: "flex-start",
    backgroundColor: "orange",
    width: width - 20,
    marginLeft: 10,
    marginRight: 10,
    height: width - 50,
    borderRadius: 10,
    marginTop: 5,
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
    // marginTop: 50,
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
    // marginTop: 50,
  },
  title: {
    fontSize: Constants.FONTSIZE,
    // marginBottom: 5,
    fontWeight: Constants.BOLDFONT,
    alignSelf: "center",
    marginTop: 50,
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
});
