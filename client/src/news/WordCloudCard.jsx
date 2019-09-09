import React, { Component } from "react";
import handleErrors from "../utils/errors.js";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import WordCloudChart from "./WordCloudChart";

export default class WordCloudCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    // this.getNews();
  }
  componentDidUpdate(prevProps) {
    // if (prevProps.newsId !== this.props.newsId) {
    //   this.getNews();
    // }
  }
  render() {
    return (
      <Card className={this.props.className}>
        <CardActionArea>
          {/* <CardMedia
            component="img"
            alt={this.state.title}
            // className={"media"}
            // height="200"
            image={this.state.imageUrl}
            title={this.state.title}
          /> */}
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className="card-content"
            >
              {/* {this.props.tokens} */}
              <WordCloudChart words={this.props.tokens} size={400} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
