import React, { Component } from "react";
import handleErrors from "../utils/errors.js";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { withRouter } from "react-router-dom";
import CategoryLine from "../components/CategoryLine";

class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keyword: "",
      title: "",
      prediction: "",
      sentimentScore: "",
      imageUrl: ""
    };
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
              prediction: data.prediction,
              imageUrl: data.news_image
            });
          })
          .catch(err => {
            // console.error(err);
            this.setState({ loading: false });
          });
      }
    );
  }
  handleCardClick() {
    this.props.history.push({
      pathname: `/news/${this.props.newsId}`
    });
  }
  componentDidMount() {
    this.getNews();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.newsId !== this.props.newsId) {
      this.getNews();
    }
  }
  render() {
    return (
      <Card className={this.props.className} onClick={this.handleCardClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.state.title}
            className={"media"}
            // height="200"
            image={this.state.imageUrl}
            title={this.state.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className="card-content"
              // style={{ height: 70 }}
            >
              {/* <CategoryLine value={this.state.title} /> */}
              {this.props.content ? this.props.content : this.state.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withRouter(NewsCard);
