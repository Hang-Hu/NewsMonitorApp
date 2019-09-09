import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

function fixedLine(line) {
  let LENGTH = 55;
  if (line.length <= LENGTH) {
    return line;
  } else {
    return `${line.substring(0, LENGTH)}...`;
  }
}
export default class CategoryLine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return fixedLine(this.props.value);
  }
}
