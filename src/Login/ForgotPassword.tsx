import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  PixelRatio,
} from "react-native";
import firebase from "../../firebase/firebaseSetup";
import { withNavigation } from "react-navigation";
import * as Constants from "../../Constants";

class ForgotPassword extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }

  //Does not alert user if email entered is not a user.

  submit() {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => console.log("Password reset email sent."))
        .catch((err) => console.log("Password reset email error", err));
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructionsTop}>
          Swipe down from top to dismiss.
        </Text>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.instructions}>
              Enter email to send password reset instructions.
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => this.setState({ email: text })}
            ></TextInput>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.submit()}
            >
              <Text style={Constants.BUTTONTEXT.buttonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
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
  textInput: {
    backgroundColor: "#eee",
    width: Dimensions.get("window").width - 100,
    height: Constants.INPUTHEIGHT,
    fontSize: Constants.FONTSIZE,
    marginBottom: 15,
    paddingLeft: Constants.INPUTPADLEFT,
    borderRadius: Constants.BORDERRADIUS,
    marginTop: 15,
  },
  instructions: {
    fontSize: Constants.FONTSIZE,
    textAlign: "center",
  },
  instructionsTop: {
    fontSize: Constants.FONTSIZE,
    textAlign: "center",
    paddingTop: 50,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 120 * PixelRatio.getFontScale(),
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 20,
    borderRadius: Constants.BORDERRADIUS,
  },
});

export default withNavigation(ForgotPassword);
