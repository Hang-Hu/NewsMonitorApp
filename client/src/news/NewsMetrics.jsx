import React, { Component } from "react";

export default class NewsMetrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps) {}
  render() {
    return (
      <div className="news-metrics">
        {this.props.keyword && <p>Keyword: {this.props.keyword}</p>}
        {this.props.prediction && (
          <p style={{ fontWeight: "bold" }}>
            Prediction: {this.props.prediction.toString().toUpperCase()}
          </p>
        )}
        {this.props.sentimentScore && (
          <p style={{ fontWeight: "bold" }}>
            Sentiment Score: {this.props.sentimentScore}
          </p>
        )}
      </div>
    );
  }
}
