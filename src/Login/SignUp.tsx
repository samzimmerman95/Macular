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
} from "react-native";
import { withNavigation } from "react-navigation";
import firebase from "../../firebase/firebaseSetup";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Constants from "../../Constants";

class SignUp extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      confirmedPassword: "",
      yearOfBirth: "",
    };
    this.signUp = this.signUp.bind(this);
  }
  nextInput = {};

  getUser() {
    return firebase.auth().currentUser;
  }

  async setName(auth, user) {
    var name = "";
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        name = doc.data().name;
        console.log("setName: ", name);
      });
    await auth.currentUser.updateProfile({ displayName: name });
  }

  async signUp() {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      if (this.state.password == this.state.confirmedPassword) {
        var auth = firebase.auth();
        await auth
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .catch((error) => {
            console.log("Sign Up Error: ", error);
            Alert.alert(error.code);
          });
        var user = this.getUser();
        await firebase.firestore().collection("users").doc(user.uid).set({
          name: this.state.fullName,
          email: this.state.email,
          YOB: this.state.yearOfBirth,
        });

        auth.onAuthStateChanged(async (user) => {
          if (user) {
            await this.setName(auth, user);
            this.props.navigation.navigate("AuthLoading");
          }
        });
      } else {
        Alert.alert("Passwords do not match");
      }
    } else {
      Alert.alert("Invalid email address");
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.centeredItems}>
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              autoCapitalize="words"
              returnKeyType="next"
              onChangeText={(text) => this.setState({ fullName: text })}
              onSubmitEditing={() => this.nextInput[2].focus()}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              ref={(input) => (this.nextInput[2] = input)}
              onChangeText={(text) => this.setState({ email: text })}
              onSubmitEditing={() => this.nextInput[3].focus()}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              ref={(input) => (this.nextInput[3] = input)}
              onChangeText={(text) => this.setState({ password: text })}
              onSubmitEditing={() => this.nextInput[4].focus()}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry={true}
              ref={(input) => (this.nextInput[4] = input)}
              onChangeText={(text) =>
                this.setState({ confirmedPassword: text })
              }
              onSubmitEditing={() => this.nextInput[5].focus()}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Year of Birth"
              autoCapitalize="none"
              ref={(input) => (this.nextInput[5] = input)}
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={(text) => this.setState({ yearOfBirth: text })}
            ></TextInput>
          </View>
          <View style={styles.centeredItems}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.signUp()}
            >
              <Text style={Constants.BUTTONTEXT.buttonText}> Sign up </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: 'center',
    justifyContent: "center",
  },
  centeredItems: {
    justifyContent: "center",
    alignItems: "center",
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
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 100,
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 30,
    borderRadius: Constants.BORDERRADIUS,
  },
});
export default withNavigation(SignUp);
