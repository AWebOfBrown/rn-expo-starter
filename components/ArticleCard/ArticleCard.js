import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  PanResponder
} from "react-native";

import Actions from "./Actions";
import ArticlePreview from "./ArticlePreview";

const Screen = Dimensions.get("window");
const screenWidth = Screen.width;

export default class ArticleCard extends Component {
  state = {
    swipedRight: false
  };
  articleRef = null;
  getRef = ref => (this.articleRef = ref);
  translateX = new Animated.Value(0);

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, { dx, dy }) => {
      return Math.abs(dx) > Math.abs(dy * 2);
    },
    onMoveShouldSetPanResponderCapture: (evt, { dx, dy }) => {
      return Math.abs(dx) > Math.abs(dy * 2);
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: this.translateX
      }
    ]),
    onPanResponderRelease: (e, { vx, dx }) => {
      let cardSwipedRight = vx <= 0;

      if (Math.abs(vx) >= 0.15 || Math.abs(dx) >= 0.2 * screenWidth) {
        let toValue = 0;

        if (cardSwipedRight) {
          toValue = -screenWidth;
          this.setState({ swipedRight: true });
        } else {
          this.setState({ swipedRight: false });
        }

        Animated.timing(this.translateX, {
          toValue,
          duration: 200
        }).start();
      } else {
        Animated.spring(this.translateX, {
          toValue: this.state.swipedRight ? -screenWidth : 0,
          bounciness: 10
        }).start();
      }
    }
  });

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.index !== this.props.index) {
      return true;
    }
    return false;
  }

  render() {
    let {
      title,
      author,
      commentCount,
      score,
      index,
      id,
      time,
      url,
      rank,
      navigation
    } = this.props;

    let urlRegexed = url
      ? url.match(/(?!w{1,}\.)(\w+\.?)([a-zA-Z]+)(\.\w+)/)
      : null;
    let regexMatch = urlRegexed ? urlRegexed[0] : null;

    return (
      <View style={styles.container} key={id}>
        <Animated.View
          horizontal
          style={{
            flex: 1,
            width: 2 * screenWidth,
            transform: [{ translateX: this.translateX }],
            display: "flex"
          }}
          {...this.panResponder.panHandlers}
        >
          <ArticlePreview
            rank={rank}
            url={regexMatch}
            title={title}
            commentCount={commentCount}
            time={time}
          />
          <Actions articleID={id} navigation={navigation} left={Screen.width} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: 100,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    backgroundColor: "#112247",
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    marginBottom: 5,
    position: "relative"
  }
});
