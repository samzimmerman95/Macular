import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Constants from "../../Constants";

const margin = 0.5;
var dim = (Dimensions.get("window").width - 38 * margin - 20) / 19;

export default class ResultGridCell extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
    };

    if (this.props.value == 0) {
      this.state = { color: Constants.LIGHTGRAY };
    } else if (this.props.value == 1) {
      this.state = { color: "rgb(248,134,255)" }; //#F886FF
    } else if (this.props.value == 2) {
      this.state = { color: "rgb(255,0,0)" };
    }
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.color }]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: margin,
    height: dim,
    width: dim,
  },
});
