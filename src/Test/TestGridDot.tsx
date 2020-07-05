import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Constants from "../../Constants";

var d = (Dimensions.get("window").width - 20) / 10;
const dim = parseInt(d.toString());
const margin = (Dimensions.get("window").width - dim * 10) / 20;

export default class TestGridDot extends React.Component<any, any> {
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
    height: dim,
    width: dim,
    margin: margin,
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
