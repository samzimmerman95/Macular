import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import firebase from "../../firebase/firebaseSetup";

export default class LoginLoading extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Loading Page: User is signed in: ", user.displayName);
        this.props.navigation.navigate("App");
      } else {
        console.log("Loading Page: No user is signed in");
        this.props.navigation.navigate("AuthStack");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" />
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
});
