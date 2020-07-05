import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Constants from "../../Constants";

const margin = 0.5;
var dim = (Dimensions.get("window").width - 38 * margin - 20) / 19;

export default class ResultGridDot extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: margin,
    height: dim,
    width: dim,
    backgroundColor: Constants.LIGHTGRAY,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: dim - dim / 20,
    width: dim - dim / 20,
    borderRadius: dim / 2,
    backgroundColor: "rgb(0,0,255)",
  },
});
