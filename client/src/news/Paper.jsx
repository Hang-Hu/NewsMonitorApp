import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <Paper className="paper-root" elevation={1}>
        {/* <Typography variant="h5" component="h3">
            This is a sheet of paper.
          </Typography> */}
        <Typography component="p">{this.props.content}</Typography>
      </Paper>
    );
  }
}
