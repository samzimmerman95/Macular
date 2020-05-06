import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import firebase from "../../firebase/firebaseSetup";
import TestGridCell from "./TestGridCell";
import TestGridDot from "./TestGridDot";
import * as Constants from "../../Constants";

class TestGrid extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.submitChangesToFirebase = this.submitChangesToFirebase.bind(this);
    var dataValues = [];
    for (var i = 0; i < 10 * 10; i++) {
      dataValues.push({ key: i, value: 0 });
    }

    if (this.props.quadrant == "top_right") {
      this.state = { dataValues: dataValues, dotIndex: 90 };
    } else if (this.props.quadrant == "top_left") {
      this.state = { dataValues: dataValues, dotIndex: 99 };
    } else if (this.props.quadrant == "bottom_left") {
      this.state = { dataValues: dataValues, dotIndex: 9 };
    } else if (this.props.quadrant == "bottom_right") {
      this.state = { dataValues: dataValues, dotIndex: 0 };
    }
  }

  updateNewValue(index) {
    var dataCopy = [...this.state.dataValues];
    dataCopy[index].value = (dataCopy[index].value + 1) % 3;
    this.setState({ dataValues: dataCopy });
  }

  submitChangesToFirebase() {
    console.log("submitChanges() called");
    let userDoc = firebase
      .firestore()
      .collection("tests")
      .doc(firebase.auth().currentUser.uid);
    let docRef = userDoc.collection(this.props.timestamp).doc(this.props.eye);

    var data = [];
    for (var i = 0; i < this.state.dataValues.length; i++) {
      data.push(this.state.dataValues[i].value);
    }

    if (this.props.quadrant == "top_right") {
      docRef.set({ top_right: data }, { merge: true });
    } else if (this.props.quadrant == "top_left") {
      docRef.set({ top_left: data }, { merge: true });
    } else if (this.props.quadrant == "bottom_left") {
      docRef.set({ bottom_left: data }, { merge: true });
    } else if (this.props.quadrant == "bottom_right") {
      docRef.set({ bottom_right: data }, { merge: true });
    }

    this.props.navigation.navigate(this.props.next, {
      timestamp: this.props.timestamp,
    });
  }

  renderItem = ({ item }) => {
    if (item.key == this.state.dotIndex) {
      return <TestGridDot />;
    } else {
      return (
        <TestGridCell
          value={item.value}
          updateFunction={this.updateNewValue.bind(this, item.key)}
          index={item.key}
        />
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grid}>
          <FlatList
            scrollEnabled={false}
            data={this.state.dataValues}
            renderItem={this.renderItem}
            style={styles.cellContainer}
            numColumns={10}
            extraData={this.state.dataValues}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.submitChangesToFirebase()}
        >
          <Text style={Constants.BUTTONTEXT.buttonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cellContainer: {
    alignSelf: "center",
    alignContent: "center",
  },
  grid: {
    flexDirection: "row",
    backgroundColor: "#000",
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
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
  buttonText: {
    fontSize: Constants.FONTSIZE,
  },
});

export default withNavigation(TestGrid);
