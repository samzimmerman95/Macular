import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase/firebaseSetup";
import * as Constants from "../../Constants";

export default class TestPage1 extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Testing Instructions</Text>
        <Text style={styles.instructions}>
          Hold phone at a normal arms reach. It is important you keep your phone
          in the same place to ensure consistent results. You will test one eye
          at a time, first we will test the left eye.
        </Text>
        <Text></Text>
        <Text style={styles.instructions}>Close your right eye.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate("Test2", {
              timestamp: new Date().getTime().toString(),
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 100,
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 30,
    borderRadius: Constants.BORDERRADIUS,
  },
  title: {
    fontWeight: Constants.BOLDFONT,
    fontSize: Constants.FONTSIZE,
  },
  instructions: {
    textAlign: "center",
    fontSize: Constants.FONTSIZE,
    marginLeft: 20,
    marginRight: 20,
  },
});
