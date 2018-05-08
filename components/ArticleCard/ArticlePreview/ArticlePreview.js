import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ArticlePreview = ({ title, commentCount, url, rank, time }) => {
  return (
    <View style={[styles.row, { paddingBottom: 30 }]}>
      <Text style={styles.title}>
        {" "}
        {title.replace(/\b\w/g, t => t.toUpperCase())}
      </Text>

      <View style={styles.meta}>
        <Text style={styles.commentCount}>{commentCount} Comments </Text>
        {url && <View style={styles.divider} />}
        <Text style={styles.linkURL}>{url}</Text>
      </View>

      <Text style={styles.rank}> #{rank} </Text>
    </View>
  );
};

export default ArticlePreview;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    width: screenWidth,
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#d7edff",
    paddingRight: 40
  },
  meta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
    bottom: 10,
    height: 30,
    opacity: 0.8
  },
  rank: {
    position: "absolute",
    fontSize: 18,
    bottom: 10,
    right: 10,
    color: "#7aaaf9",
    opacity: 0.4
  },
  commentCount: {
    color: "#7aaaf9",
    fontSize: 12,
    marginLeft: 10
  },
  linkURL: {
    color: "#7aaaf9",
    fontSize: 12,
    marginLeft: 5
  },
  divider: {
    height: 6,
    width: 6,
    backgroundColor: "#7aaaf9",
    opacity: 0.3,
    borderRadius: 3,
    marginLeft: 2,
    marginRight: 2
  }
});
