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
import TestGrid from "./TestGrid";
import * as Constants from "../../Constants";

export default class TestPage11 extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      nTests: 0,
      dates: [],
      timestamp: this.props.navigation.getParam("timestamp"),
    };
  }
  _isMounted: boolean = false;

  async componentDidMount() {
    this._isMounted = true;
    var newNumTests: number;
    var dates = [];
    // let this.state.timestamp = new Date().getTime().toString();
    var latestTestDate: string;
    let db = firebase
      .firestore()
      .collection("tests")
      .doc(firebase.auth().currentUser.uid);
    await db.get().then((doc) => {
      if (doc.exists) {
        try {
          var n = doc.data().numTests;
          if (n == undefined) {
            newNumTests = 1;
          } else {
            newNumTests = n + 1;
          }
        } catch {}
        try {
          dates = [...doc.data().testDates];
          latestTestDate = dates.pop();
          dates.push(latestTestDate);
          dates.push(this.state.timestamp);
        } catch {
          dates = [this.state.timestamp];
        }
      } else {
        newNumTests = 1;
        dates = [this.state.timestamp];
      }
      if (this._isMounted) {
        this.setState({ nTests: newNumTests });
        this.setState({ dates: dates });
      }
    });
    await this.sameDate(latestTestDate, this.state.timestamp);
    await this.createOverallGrid("left");
    await this.createOverallGrid("right");
  }

  async sameDate(date1: string, date2: string) {
    let db = firebase
      .firestore()
      .collection("tests")
      .doc(firebase.auth().currentUser.uid);
    if (date1 != date2) {
      await db.set({
        numTests: this.state.nTests,
        testDates: this.state.dates,
      });
    }
  }

  async createOverallGrid(eye: string) {
    var gridData = [];
    var tr = [];
    var tl = [];
    var bl = [];
    var br = [];

    // let date = new Date();
    // let this.state.timestamp =
    //   date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    // let this.state.timestamp = new Date().getTime().toString();

    let docRef = firebase
      .firestore()
      .collection("tests")
      .doc(firebase.auth().currentUser.uid)
      .collection(this.state.timestamp)
      .doc(eye);
    docRef.onSnapshot((docSnapshot) => {
      let docData = docSnapshot.data();
      tr = [...docData.top_right];
      tl = [...docData.top_left];
      bl = [...docData.bottom_left];
      br = [...docData.bottom_right];

      var top = [];
      var index_left = 0;
      var index_right = 1;
      for (var i = 0; i < 10; i++) {
        top = top.concat(tl.slice(index_left, index_left + 10));
        top = top.concat(tr.slice(index_right, index_right + 9));
        index_left += 10;
        index_right += 10;
      }

      var bottom = [];
      var index_left = 10;
      var index_right = 11;
      for (var i = 0; i < 9; i++) {
        bottom = bottom.concat(bl.slice(index_left, index_left + 10));
        bottom = bottom.concat(br.slice(index_right, index_right + 9));
        index_left += 10;
        index_right += 10;
      }

      gridData = top.concat(bottom);
      docRef.set({ total: gridData }, { merge: true });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textInstructions}>Right eye test complete.</Text>
        <Text style={styles.textInstructions}>
          Go to Results to see your results.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("ResultLoad")}
        >
          <Text style={Constants.BUTTONTEXT.buttonText}> Go To Results </Text>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 150 * PixelRatio.getFontScale(),
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 30,
    borderRadius: Constants.BORDERRADIUS,
  },
});
