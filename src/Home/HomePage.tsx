import React from "react";
import firebase from "../../firebase/firebaseSetup";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { firestore } from "firebase";
import * as Constants from "../../Constants";

export default class HomePage extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uid: "",
      testsExist: false,
      fullDaysSince: 0,
      totalTests: "",
      lastTest: "",
    };
  }
  _isMounted: boolean = false;

  componentDidMount() {
    this._isMounted = true;
    this.props.navigation.addListener(
      "didFocus",
      this.updateOnNewData.bind(this)
    );
    // let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this._isMounted) {
          this.setState({ name: user.displayName });
          this.setState({ uid: user.uid });
        }
        let docRef = firebase
          .firestore()
          .collection("tests")
          .doc(user.uid)
          .get();
        docRef.then((doc) => {
          if (doc.exists) {
            if (this._isMounted) {
              this.setState({ testsExist: true });
              let tests = doc.data().numTests;
              this.setState({ totalTests: tests });
              let dates = [...doc.data().testDates];
              let lastTest = new Date(parseInt(dates[tests - 1]));
              let now = new Date();
              let todayStart = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              // Account of tests taken within 24 hours but on different days
              // If there has been more time (less than 1 day) but more than since
              // midnight, then a "day" has passed so increase displayed count
              let sinceMidnight =
                (now.getTime() - todayStart.getTime()) / 86400000;
              let fullDaysSince: number = Math.floor(
                (now.getTime() - lastTest.getTime()) / 86400000
              );
              let fractionDaySince: number =
                (now.getTime() - lastTest.getTime()) / 86400000 - fullDaysSince;
              if (fractionDaySince > sinceMidnight) {
                fullDaysSince += 1;
              }
              this.setState({ fullDaysSince: fullDaysSince });
              this.setState({
                lastTest: lastTest.toDateString(),
              });
            }
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateOnNewData() {
    // When screen comes in focus, check if current data is correct compared to
    // the database, and if not, go to the loading screen which will update it
    // let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let docRef = firebase
          .firestore()
          .collection("tests")
          .doc(user.uid)
          .get();
        docRef.then((doc) => {
          if (doc.exists) {
            let tests = doc.data().numTests;
            if (tests != this.state.totalTests) {
              this.props.navigation.navigate("AuthLoading");
            }
          }
        });
      }
    });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Successfully logged out");
        this.props.navigation.navigate("Login");
      })
      .catch((error) => console.log("Sign out error: ", error));
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.allButLogout}>
          <Image
            style={styles.image}
            source={require("../../assets/icon.png")}
          ></Image>
          <Text style={styles.text}> Welcome, {this.state.name} </Text>
          {this.state.testsExist ? (
            <View style={styles.info}>
              <Text style={styles.text}>
                {" "}
                Number of Tests: {this.state.totalTests}{" "}
              </Text>
              {/* <Text style={styles.text}>
                Date of Last Test: {this.state.lastTest}
              </Text> */}
              <Text style={styles.text}>
                Days Since Last Test: {this.state.fullDaysSince}
              </Text>
            </View>
          ) : (
            <Text style={styles.text}>
              Go to the Test tab to complete your first test!
            </Text>
          )}
        </View>
        <View style={styles.logout}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => this.logout()}
          >
            <Text style={Constants.BUTTONTEXT.buttonText}> Logout </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 100,
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 30,
    borderRadius: Constants.BORDERRADIUS,
  },
  allButLogout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: Constants.FONTSIZE,
  },
  image: {
    height: 130,
    width: 130,
  },
});
