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

  changeValue() {
    this.props.updateFunction(this.props.index);

    if (this.state.color == Constants.LIGHTGRAY) {
      this.setState({ color: "rgb(248,134,255)" });
    } else if (this.state.color == "rgb(248,134,255)") {
      this.setState({ color: "rgb(255,0,0)" });
    } else if (this.state.color == "rgb(255,0,0)") {
      this.setState({ color: Constants.LIGHTGRAY });
    }
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.color }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.changeValue()}
        >
          <Text></Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: dim,
    width: dim,
    margin: margin,
  },
  button: {
    height: dim,
    width: dim,
  },
});
