import React, { Component } from "react";
import NewsCard from "./NewsCard";
import handleErrors from "../utils/errors.js";

export default class NewsBundlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newsIdArr: []
    };
    this.getNewsArr = this.getNewsArr.bind(this);
  }
  getNewsArr() {
    const url = `/api/news/all/date/${
      this.props.match.params.date
    }`;
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
              newsIdArr: data
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
    this.getNewsArr();
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.date !== this.props.date) {
  //     this.getNewsArr();
  //   }
  // }
  render() {
    // const WIDTH = `${100 / 2}%`;
    return (
      <div>
        <NewsCard
          className="top-card"
          newsId={this.props.location.state.newsId}
          content={`News Widely Spread in Twitter in ${
            this.props.match.params.date
          }`}
        />
        <div style={{ textAlign: "center" }}>
          {this.state.newsIdArr &&
            this.state.newsIdArr.map(newsId => (
              <NewsCard className="news-card" key={newsId} newsId={newsId} />
            ))}
        </div>
      </div>
    );
  }
}
