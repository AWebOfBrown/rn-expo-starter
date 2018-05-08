import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-renderer";
import { inject, observable } from "mobx-react";

@inject("articleStore")
@observer
export default class Comment extends React.Component {
  render() {
    let {
      content,
      depth,
      children,
      type,
      author,
      time,
      deleted,
      id
    } = this.props;

    return (
      <View style={styles.container}>
        <Markdown> {content} </Markdown>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
