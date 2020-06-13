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

export default class TestGridCell extends React.Component<any, any> {
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

  updateColor() {
    if (this.props.value == 0) {
      this.setState({ color: Constants.LIGHTGRAY });
    } else if (this.props.value == 1) {
      this.setState({ color: "rgb(248,134,255)" }); //#F886FF
    } else if (this.props.value == 2) {
      this.setState({ color: "rgb(255,0,0)" });
    }
  }

  render() {
    return (
      <View
        style={[
          this.props.active ? styles.active : styles.container,
          { backgroundColor: this.state.color },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: dim,
    width: dim,
    margin: margin,
  },
  active: {
    height: dim,
    width: dim,
    margin: margin,
    borderWidth: 5,
    borderColor: "red",
  },
  button: {
    height: dim,
    width: dim,
  },
});
