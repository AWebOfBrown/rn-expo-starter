import React, { Component } from "react";
import { View, Text } from "react-native";
import Comment from "../components/Comment";

class CommentaryScreen extends Component {
  state = {
    commentTree: null
  };

  componentDidMount() {
    let commentTree = Promise.all(
      this.preOrderTraversalRender(this.props.branches)
    ).then(tree => this.setState({ commentTree: tree }));
  }

  preOrderTraversalRender({ comment, rank = 0, cardProps }) {
    let children = [];
    if (comment) {
      if (comment.children) {
        children = comment.children.map((child, index) =>
          preOrderTraversalRender({ comment: child, rank: index, cardProps })
        );
      }
    } else {
      return null;
    }
    return React.createElement(
      Comment,
      {
        ...cardProps,
        content: comment.text,
        depth: comment.depth,
        author: comment.by,
        time: comment.time,
        type: comment.type,
        siblingOrder: rank,
        id: comment.id,
        parent: comment.parent,
        deleted: comment.deleted
      },
      children
    );
  }

  render() {
    return <View>{this.state.commentTree}</View>;
  }
}

export default CommentaryScreen;
