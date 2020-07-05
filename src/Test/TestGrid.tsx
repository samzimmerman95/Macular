import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
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
      this.state = {
        dataValues: dataValues,
        dotIndex: 90,
        activeCellPattern: [...Constants.TOPRIGHT],
        activeCellIndex: 0,
        selectedCellExists: false,
        rowEnds: [...Constants.TOPRIGHTENDS],
        numEmptyRows: 0,
      };
    } else if (this.props.quadrant == "top_left") {
      this.state = {
        dataValues: dataValues,
        dotIndex: 99,
        activeCellPattern: [...Constants.TOPLEFT],
        activeCellIndex: 0,
        selectedCellExists: false,
        rowEnds: [...Constants.TOPLEFTENDS],
        numEmptyRows: 0,
      };
    } else if (this.props.quadrant == "bottom_left") {
      this.state = {
        dataValues: dataValues,
        dotIndex: 9,
        activeCellPattern: [...Constants.BOTTOMLEFT],
        activeCellIndex: 0,
        selectedCellExists: false,
        rowEnds: [...Constants.BOTTOMLEFTENDS],
        numEmptyRows: 0,
      };
    } else if (this.props.quadrant == "bottom_right") {
      this.state = {
        dataValues: dataValues,
        dotIndex: 0,
        activeCellPattern: [...Constants.BOTTOMRIGHT],
        activeCellIndex: 0,
        selectedCellExists: false,
        rowEnds: [...Constants.BOTTOMRIGHTENDS],
        numEmptyRows: 0,
      };
    }
  }

  updateNewValue(index, value) {
    var dataCopy = [...this.state.dataValues];
    dataCopy[index].value = value;
    this.setState({ dataValues: dataCopy });
  }

  submitChangesToFirebase() {
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

  selectedCellExists = false;

  seeButtonUpdate() {
    this.setState({ activeCellIndex: this.state.activeCellIndex + 1 });
    this.checkForCompletion();
  }

  fuzzyButtonUpdate() {
    let cellIndex = this.state.activeCellPattern[this.state.activeCellIndex];
    this.updateNewValue(cellIndex, 1);
    this.setState({ activeCellIndex: this.state.activeCellIndex + 1 });
    this.selectedCellExists = true;
    this.checkForCompletion();
  }

  noSeeButtonUpdate() {
    let cellIndex = this.state.activeCellPattern[this.state.activeCellIndex];
    this.updateNewValue(cellIndex, 2);
    this.setState({ activeCellIndex: this.state.activeCellIndex + 1 });
    this.selectedCellExists = true;
    this.checkForCompletion();
  }

  checkForCompletion() {
    let cellIndex = this.state.activeCellPattern[this.state.activeCellIndex];
    if (this.state.rowEnds.includes(cellIndex)) {
      if (!this.selectedCellExists) {
        this.setState({ numEmptyRows: this.state.numEmptyRows + 1 });
        if (this.state.numEmptyRows == 1) {
          this.submitChangesToFirebase();
        }
      }
      this.selectedCellExists = false;
    }
  }

  renderItem = ({ item }) => {
    if (item.key == this.state.dotIndex) {
      return <TestGridDot />;
    } else {
      if (
        item.key == this.state.activeCellPattern[this.state.activeCellIndex]
      ) {
        return <TestGridCell value={item.value} active={true} />;
      } else {
        return <TestGridCell value={item.value} active={false} />;
      }
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
            extraData={this.state}
          />
        </View>
        <Text style={styles.textInstructions}>
          Focus on highlighted cell. Can you see the blue dot?
        </Text>
        <View style={styles.buttons}>
          <ScrollView
            contentContainerStyle={{
              width: Dimensions.get("window").width,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.seeButtonUpdate()}
            >
              <Text style={Constants.BUTTONTEXT.buttonText}> Yes </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.fuzzyButtonUpdate()}
            >
              <Text style={Constants.BUTTONTEXT.buttonText}> It's Fuzzy </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.noSeeButtonUpdate()}
            >
              <Text style={Constants.BUTTONTEXT.buttonText}> No </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
  scroll: {
    flexGrow: 1,
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
  buttons: {
    flexDirection: "column",
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    height: Constants.BUTTONHEIGHT,
    width: 200 * PixelRatio.getFontScale(),
    backgroundColor: Constants.LIGHTGRAY,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: Constants.BORDERRADIUS,
  },
  buttonText: {
    fontSize: Constants.FONTSIZE,
  },
  textInstructions: {
    fontSize: Constants.FONTSIZE,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
  },
});

export default withNavigation(TestGrid);
