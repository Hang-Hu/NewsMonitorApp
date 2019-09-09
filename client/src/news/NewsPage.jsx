import React, { Component } from "react";
import handleErrors from "../utils/errors.js";
import WordCloudChart from "./WordCloudChart.jsx";
import "./newspage.css";
import CommentSheets from "./CommentSheets";
import CommentTimeListChart from "./CommentTimeListChart";
import HeatMap from "./HeatMap";
import Paper from "./Paper";
import WordCloudCard from "./WordCloudCard";
import NewsMetrics from "./NewsMetrics";
import TwitterCommentDisplay from "./TwitterCommentDisplay";

export default class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newsTokens: "",
      tweetsTokens: "",
      keyword: "",
      title: "",
      url: "",
      prediction: "",
      content: "",
      commentTimeStr: [],
      imageUrl: ""
    };
    this.getNews = this.getNews.bind(this);
  }
  getNews() {
    const url = `/api/news/one/${
      this.props.match.params.newsId
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
              newsTokens: data.news_tokens,
              tweetsTokens: data.tweets_tokens,
              title: data.news_title,
              keyword: data.news_keyword,
              url: data.news_url,
              prediction: data.prediction,
              content: data.news_text,
              sentimentScore: data.weighted_sentiment_score,
              commentTimeStr: data.comment_time,
              imageUrl: data.news_image,
              tweetId: data.tweet_url.slice(
                data.tweet_url.lastIndexOf("/") + 1,
                data.tweet_url.length
              )
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
    this.getNews();
  }

  render() {
    let width = window.innerWidth / 2 - 100;
    return (
      <div className="page">
        {this.state.title && (
          <h1
            style={{ backgroundImage: `url(${this.state.imageUrl})` }}
            className="title"
          >
            <a href={this.state.url} target="_blank">
              {this.state.title}
            </a>
          </h1>
        )}
        <NewsMetrics
          keyword={this.state.keyword}
          prediction={this.state.prediction}
          sentimentScore={this.state.sentimentScore}
        />
        {/* {this.state.content && (
          <div className="content">{this.state.content}</div>
        )} */}
        <div className="paper-tweet">
          <Paper content={this.state.content} />
          {/* <CommentSheets newsId={this.props.match.params.newsId} /> */}
          {this.state.tweetId && (
            <TwitterCommentDisplay id={this.state.tweetId} />
          )}
        </div>

        <div className="wordcloud-card-list">
          {this.state.newsTokens && (
            <div className="wordcloud-card">
              <h4 className="wordcloud-title">News Word Cloud</h4>
              <WordCloudChart words={this.state.newsTokens} width={width} />
            </div>
          )}
          {this.state.tweetsTokens && (
            <div className="wordcloud-card">
              <h4 className="wordcloud-title">Tweets Word Cloud</h4>
              <WordCloudChart words={this.state.tweetsTokens} width={width} />
            </div>
          )}
        </div>
        {this.state.commentTimeStr.length > 0 && (
          <CommentTimeListChart commentTimeStr={this.state.commentTimeStr} />
        )}
        {/* <HeatMap newsId={this.props.match.params.newsId} /> */}
      </div>
    );
  }
}
