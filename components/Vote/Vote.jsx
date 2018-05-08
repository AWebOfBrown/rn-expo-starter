import React, { Component } from "react";
import PropTypes from "prop-types";

const UPVOTE = "UPVOTE";
const DOWNVOTE = "DOWNVOTE";

let initialState = {
  [UPVOTE]: false,
  [DOWNVOTE]: false
};

class Vote extends Component {
  state = initialState;
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  handleVote(voteDirection) {
    if (voteDirection && this.state[voteDirection]) {
      this.setState({ ...initialState });
    } else {
      this.setState({ ...initialState, [voteDirection]: true });
    }
  }

  render() {
    let isUpVoted = this.state[UPVOTE];
    let isDownVoted = this.state[DOWNVOTE];

    return this.props.render({
      isUpVoted,
      isDownVoted,
      onUpVote: () => this.handleVote(UPVOTE),
      onDownVote: () => this.handleVote(DOWNVOTE)
    });
  }
}

export default Vote;
