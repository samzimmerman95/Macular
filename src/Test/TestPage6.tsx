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
import firebase from "../../firebase/firebaseSetup";
import * as Constants from "../../Constants";

export default class TestPage6 extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textInstructions}>Left eye test complete.</Text>
        <Text style={styles.textInstructions}>
          Switch to right eye. Close left eye.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate("Test7", {
              timestamp: this.props.navigation.getParam("timestamp"),
            })
          }
        >
          <Text style={Constants.BUTTONTEXT.buttonText}> Next </Text>
        </TouchableOpacity>
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
  grid: {
    flexDirection: "row",
    backgroundColor: "#000",
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 100 * PixelRatio.getFontScale(),
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 30,
    borderRadius: Constants.BORDERRADIUS,
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
