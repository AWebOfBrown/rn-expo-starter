import { action, observable, flow } from "mobx";

export default class ArticleStore {
  @observable articles = { byID: {}, byOrder: [] };
  @observable error = null;
  @observable fetchStatus = null;

  fetchCommentsBranches = flow(function*(articleID) {
    let commentBranches = this.articles.byID[id].kids;
    let commentTree = yield Promise.all(
      commentBranches.map(id => this.fetchCommentBranch(id))
    );
    return commentTree;
  });

  fetchCommentBranch = flow(function*(commentID) {
    let comment;

    try {
      comment = yield fetch(
        `https://hacker-news.firebaseio.com/v0/item/${branchID}.json`
      ).then(res => res.json());

      if (!comment) {
        return;
      }

      comment.children = [];
      comment.depth = depth;

      if (comment.kids) {
        comment.children = yield Promise.all(
          comment.kids.map(commentID =>
            this.fetchComments(commentID, depth + 1)
          )
        );
      }
      return comment;
    } catch (e) {
      console.log(e);
    }
  });

  fetchArticles = flow(function*(startRank = 0, endRank = 20) {
    let soughtArticles = [];
    this.error = null;
    this.fetchStatus = "pending";

    try {
      let top500ByOrder = yield fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      ).then(res => res.json());

      let lazyFetchSoughtArticles = () =>
        top500ByOrder
          .slice(startRank, endRank)
          .map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              res => res.json()
            )
          );
      soughtArticles = yield Promise.all(lazyFetchSoughtArticles());
      this.fetchStatus = "complete";
    } catch (e) {
      console.log(e);
      this.fetchStatus = "error";
      this.error = e;
    }
    this.setArticles(soughtArticles, startRank, endRank);
  });

  @action
  setArticles = (articles, startRank, endRank) => {
    let updatedByID = articles.reduce((articlesByID, currentArticle) => {
      articlesByID[currentArticle.id] = currentArticle;
      return articlesByID;
    }, this.articles.byID);

    this.articles.byID = updatedByID;

    // sets this.articles.byOrder by mutating array
    this.articles.byOrder.splice(startRank, endRank - startRank, ...articles);
  };
}
