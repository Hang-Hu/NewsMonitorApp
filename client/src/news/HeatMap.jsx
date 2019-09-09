import React, { Component } from "react";
import handleErrors from "../utils/errors.js";

export default class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      base64: ""
    };
    this.getHeapMapImg = this.getHeapMapImg.bind(this);
  }
  getHeapMapImg() {
    // console.log("getHeapMapImg");
    const url = `/api/news/one/news/${
      this.props.newsId
    }/heatmap`;
    // const url = `/api/news/one/${this.props.newsId}`;

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
            // console.log("----data----");
            // console.log(data[0]);
            this.setState({
              loading: false,
              base64: data[0]
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
    this.getHeapMapImg();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.newsId !== this.props.newsId) {
      this.getHeapMapImg();
    }
  }
  render() {
    return (
      <div>
        {this.state.base64 && (
          <img src={`data:image/png;base64,${this.state.base64}`} />
        )}
      </div>
    );
  }
}
