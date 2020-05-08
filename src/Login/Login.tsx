import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  PixelRatio,
} from "react-native";
import firebase from "../../firebase/firebaseSetup";
import { withNavigation } from "react-navigation";
import * as Constants from "../../Constants";

class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  nextInput;

  login() {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
          console.log("Login error: ", error.code);
          if (error.code == "auth/wrong-password") {
            Alert.alert("Incorrect password. Please try again");
          }
          if (error.code == "auth/user-not-found") {
            Alert.alert("User not found. Please Sign Up");
          }
        });
    } else {
      console.log("Failed to login");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.upper}>
              <Text style={styles.title}> Macular </Text>
              <Image
                style={styles.image}
                source={require("../../assets/icon.png")}
              ></Image>
            </View>
            <View style={styles.lower}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                autoCapitalize="none"
                returnKeyType="next"
                keyboardType="email-address"
                onChangeText={(text) => this.setState({ email: text })}
                onSubmitEditing={() => this.nextInput.focus()}
              ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
                ref={(input) => (this.nextInput = input)}
              ></TextInput>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.login()}
              >
                <Text style={Constants.BUTTONTEXT.buttonText}> Login </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text style={Constants.BUTTONTEXT.buttonText}> Sign up </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                <Text style={Constants.BUTTONTEXT.buttonText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: "flex-start",
  },
  upper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  lower: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    // height: 400,
  },

  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "normal",
  },
  textInput: {
    backgroundColor: Constants.LIGHTGRAY,
    width: Dimensions.get("window").width - 100,
    height: Constants.INPUTHEIGHT,
    fontSize: Constants.FONTSIZE,
    marginBottom: 15,
    paddingLeft: Constants.INPUTPADLEFT,
    borderRadius: Constants.BORDERRADIUS,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 180 * PixelRatio.getFontScale(),
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 20,
    borderRadius: Constants.BORDERRADIUS,
  },
  image: {
    height: 130,
    width: 130,
  },
});
export default withNavigation(Login);
