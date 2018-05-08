import React from 'react';
import Comment from '../Comment'

const CommentTree = (tree) => {
    return null
};



function preOrderTraversalRender({ comment, rank = 0, cardProps }) {
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

export default preOrderTraversalRender;

export default CommentTree;