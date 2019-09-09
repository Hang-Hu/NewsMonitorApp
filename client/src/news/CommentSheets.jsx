import React, { Component } from "react";
import CommentPaper from "./CommentPaper";
import handleErrors from "../utils/errors.js";

export default class CommentSheets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: []
    };
    this.getTop10Comments = this.getTop10Comments.bind(this);
  }
  getTop10Comments() {
    const url = `/api/news/all/news/${
      this.props.newsId
    }/comments/10`;
    this.setState(
      {
        loading: true
      },
      () => {
        fetch(url, {
          method: "GET",
          headers: {}
        })
          .then(handleErrors)
          .then(res => res.json())
          .then(data => {
            // console.log(data);
            this.setState({
              loading: false,
              commentList: data
            });
          })
          .catch(err => {
            // console.error(err);
            this.setState({ loading: false });
          });
      }
    );
  }
  componentDidMount() {
    this.getTop10Comments();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.newsId !== this.props.newsId) {
      this.getTop10Comments();
    }
  }
  render() {
    return (
      <div>
        {this.state.commentList.length > 0 && (
          <div className="row" style={{ margin: "10px 0 0 10px" }}>
            <div className="col-sm-12">
              <h3 style={{ color: "#3F51B5" }}>Comments</h3>
            </div>
          </div>
        )}

        {this.state.commentList &&
          this.state.commentList.map((comment, index) => (
            <CommentPaper
              key={index}
              // date={ comment.date }
              text={comment.comment}
              likeCount={comment.likeCount}
              // userId={ comment.user_id }
            />
          ))}
      </div>
    );
  }
}
