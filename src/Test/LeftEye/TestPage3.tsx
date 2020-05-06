import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "../../../firebase/firebaseSetup";
import TestGrid from "../TestGrid";
import * as Constants from "../../../Constants";

export default class TestPage3 extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.instructions}>
          <Text style={styles.title}>Left Eye Test</Text>
          <Text style={styles.textInstructions}>
            Focus on an empty cell, can you see the dot? If it is fuzzy/unclear,
            tap that cell once. If you cannot see it, tap that cell twice.
          </Text>
        </View>
        <TestGrid
          quadrant="top_left"
          eye="left"
          next="Test4"
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
