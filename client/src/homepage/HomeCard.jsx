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

class HomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mostPopularNewsUrl: "",
      mostPopularNewsImage: "",
      mostPopularNewsTitle: "",
      mostPopularNewsId: ""
    };
    this.getPopularNewsInfo = this.getPopularNewsInfo.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }
  getPopularNewsInfo() {
    const url = `/api/news/one/popular/date/${
      this.props.date
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
              mostPopularNewsUrl: data.news_url,
              mostPopularNewsImage: data.news_image,
              mostPopularNewsTitle: data.news_title,
              mostPopularNewsId: data.news_id
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
      pathname: `/bundle/${this.props.date.slice(0, 10)}`, //2019-04-12T00:00:00.000Z, get first 10: 2019-04-12
      state: {
        // date: this.props.date,
        newsId: this.state.mostPopularNewsId
      }
    });
  }
  componentDidMount() {
    this.getPopularNewsInfo();
  }

  render() {
    return (
      <Card className={"home-card"} onClick={this.handleCardClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.date}
            className={"media"}
            // height="200"
            image={this.state.mostPopularNewsImage}
            title={this.props.date}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {moment(this.props.date)
                .utc()
                .format("LL")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withRouter(HomeCard);
