import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

class Actions extends React.Component {
  handleCommentBtnClick = () => {
    this.props.navigation.navigate("Comments", {
      articleID: this.props.articleID
    });
  };

  render() {
    let { left } = this.props;
    const Touchable =
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <View style={[styles.row, { left }]}>
        <Touchable onPress={this.handleCommentBtnClick}>
          <View style={styles.iconGroup}>
            <MaterialCommunityIcons name="comment" size={24} color="white" />
            <Text style={styles.iconText}> CMNTS </Text>
          </View>
        </Touchable>

        <Touchable>
          <View style={styles.iconGroup}>
            <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
            <Text style={styles.iconText}> UP </Text>
          </View>
        </Touchable>

        <Touchable>
          <View style={styles.iconGroup}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
            <Text style={styles.iconText}> DOWN </Text>
          </View>
        </Touchable>

        <Touchable>
          <View style={styles.iconGroup}>
            <MaterialCommunityIcons name="pin" size={24} color="white" />
            <Text style={styles.iconText}> PIN </Text>
          </View>
        </Touchable>

        <Touchable>
          <View style={styles.iconGroup}>
            <MaterialCommunityIcons name="bookmark" size={24} color="white" />
            <Text style={styles.iconText}> BKMARK </Text>
          </View>
        </Touchable>

        <Touchable>
          <View style={styles.iconGroup}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
            />
            <Text style={styles.iconText}> MORE </Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default Actions;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    width: screenWidth,
    height: 100,
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute"
  },
  iconGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60
  },
  iconText: {
    fontSize: 12,
    color: "white",
    opacity: 0.6
  }
});
