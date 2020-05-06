import React from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { withNavigationFocus } from "react-navigation";
import firebase from "../../firebase/firebaseSetup";
import ResultGridCell from "./ResultGridCell";
import ResultGridDot from "./ResultGridDot";

class ResultGrid extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => {
    if (item.key == 180) {
      return <ResultGridDot />;
    } else {
      return <ResultGridCell value={item.value} key={item.key} />;
    }
  };
  render() {
    return (
      <View style={styles.grid}>
        <FlatList
          scrollEnabled={false}
          data={this.props.data}
          renderItem={this.renderItem}
          style={styles.container}
          numColumns={19}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignContent: "center",
  },
  grid: {
    flexDirection: "row",
    backgroundColor: "#000",
    height: Dimensions.get("window").width - 20,
    width: Dimensions.get("window").width - 20,
  },
});

export default withNavigationFocus(ResultGrid);
