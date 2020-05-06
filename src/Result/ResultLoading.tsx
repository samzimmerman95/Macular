import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import firebase from "../../firebase/firebaseSetup";

export default class ResultLoading extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      leftGrids: [],
      rightGrids: [],
      testDates: [],
    };
  }

  _isMounted: boolean = false;

  async componentDidMount() {
    this._isMounted = true;
    var gridDataLeft = [];
    var gridDataRight = [];
    var testDates = [];
    var testDatesFormatted = [];
    let docRef = firebase
      .firestore()
      .collection("tests")
      .doc(firebase.auth().currentUser.uid);

    await docRef.get().then((doc) => {
      if (doc.exists) {
        testDates = [...doc.data().testDates].reverse();

        testDates.forEach((date) => {
          testDatesFormatted.push(new Date(parseInt(date)).toDateString());
        });
        if (this._isMounted) {
          this.setState({ testDates: testDatesFormatted });
        }
        var leftCounter = 0;
        var rightCounter = 0;
        testDates.forEach((date) => {
          var left = [];
          var right = [];
          docRef
            .collection(date)
            .doc("left")
            .get()
            .then((doc) => {
              left = [...doc.data().total];
              for (var i = 0; i < 19 * 19; i++) {
                left[i] = { key: i, value: left[i] };
              }
              gridDataLeft.push({ key: leftCounter, value: left });
              if (this._isMounted) {
                this.setState({ leftGrids: gridDataLeft });
              }
              leftCounter += 1;
            });

          docRef
            .collection(date)
            .doc("right")
            .get()
            .then((doc) => {
              right = [...doc.data().total];
              for (var i = 0; i < 19 * 19; i++) {
                right[i] = { key: i, value: right[i] };
              }
              gridDataRight.push({ key: rightCounter, value: right });
              if (this._isMounted) {
                this.setState({ rightGrids: gridDataRight });
              }
              rightCounter += 1;
            });
        });
      } else {
      }
    });

    await firebase
      .firestore()
      .collection("tests")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document exists, get data and navigate to results");
          this.props.navigation.navigate("Result1", {
            dataExists: true,
            leftGrids: this.state.leftGrids,
            rightGrids: this.state.rightGrids,
            testDates: this.state.testDates,
          });
        } else {
          this.props.navigation.navigate("Result1", { dataExists: false });
          console.log("No such document");
        }
      })
      .catch((error) => {
        console.log("Error getting doc ResultPage1: ", error);
      });
    // }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
