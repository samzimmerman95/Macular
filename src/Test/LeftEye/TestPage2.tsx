import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import TestGrid from "../TestGrid";
import * as Constants from "../../../Constants";

export default class TestPage2 extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.instructions}>
          <Text style={styles.title}>Left Eye Test</Text>
        </View>
        <TestGrid
          quadrant="top_right"
          eye="left"
          next="Test3"
          timestamp={this.props.navigation.getParam("timestamp")}
        />
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
  title: {
    fontSize: Constants.FONTSIZE,
    marginBottom: 5,
    fontWeight: Constants.BOLDFONT,
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
