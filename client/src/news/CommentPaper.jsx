import React, { Component } from "react";
import "./CommentPapar.css";

export default class CommentPaper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container CommentPaper">
        <div className="row">
          <div className="col-sm-1" />
          <div className="col-sm-1">
            <div className="thumbnail">
              <img
                className="img-responsive user-photo"
                src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
              />
            </div>
          </div>
          <div className="col-sm-9 content">
            <div>
              {/* <div>
                <strong>User {this.props.userId}</strong>{" "}
                <span className="text-muted">
                  commented on {this.props.date}
                </span>
              </div> */}
              <div>{this.props.text}</div>
            </div>
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
    );
  }
}
