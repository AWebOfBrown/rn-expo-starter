import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react";

import ArticleCard from "../components/ArticleCard";

@inject("articleStore")
@observer
export default class Feed extends React.Component {
  state = {
    articles: []
  };

  async componentDidMount() {
    await this.props.articleStore.fetchArticles(0, 20);
    this.setState({ articles: this.props.articleStore.articles.byOrder });
  }

  keyExtractor = (item, index) => item.id.toString();

  renderRow = ({ item, index }) => {
    return (
      <ArticleCard
        title={item.title}
        author={item.by}
        url={item.url}
        score={item.score}
        commentCount={item.descendants}
        index={index}
        id={item.id}
        time={item.time}
        rank={index + 1}
        navigation={this.props.navigation}
      />
    );
  };

  onEndReached = async () => {
    await this.props.articleStore.fetchArticles(
      this.props.articleStore.articles.byOrder.length,
      this.props.articleStore.articles.byOrder.length + 20
    );
    this.setState({ articles: this.props.articleStore.articles.byOrder });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          onEndReachedThreshold={0.75}
          onEndReached={this.onEndReached}
          data={this.state.articles}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08152e"
  }
});
