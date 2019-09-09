import React, { Component } from "react";
import handleErrors from "../utils/errors.js";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { withRouter } from "react-router-dom";

class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keyword: "",
      title: "",
      prediction: "",
      sentimentScore: ""
    };
    this.getNews = this.getNews.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }
  getNews() {
    const url = `/api/news/one/${this.props.newsId}`;
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
              keyword: data.news_keyword,
              title: data.news_title,
              url: data.news_url,
              prediction: data.prediction
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
  componentDidUpdate(prevProps) {
    if (prevProps.newsId !== this.props.newsId) {
      this.getNews();
    }
  }
  handleCardClick() {
    this.props.history.push({
      pathname: "/news",
      state: {
        newsId: this.props.newsId
      }
    });
  }
  render() {
    // console.log(this.state.prediction);
    return (
      <Card
        style={{
          width: this.props.width,
          display: "inline-block",
          backgroundColor: "#CDECFA"
        }}
        onClick={this.handleCardClick}
      >
        <CardActionArea style={{ margin: "auto", fontFamily: "Lora" }}>
          <CardContent>
            {this.state.title && (
              <h4 style={{ fontFamily: "Montserrat", fontSize: 20 }}>
                <a href={this.state.url} target="_blank">
                  {this.state.title}
                </a>
              </h4>
            )}
            {this.state.keyword && <p>Keyword: {this.state.keyword}</p>}
            {this.state.prediction && (
              <p style={{ fontWeight: "bold" }}>
                Prediction: {this.state.prediction.toString().toUpperCase()}
              </p>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withRouter(NewsCard);
