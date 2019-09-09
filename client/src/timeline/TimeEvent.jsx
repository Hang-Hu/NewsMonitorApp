import React, { Component } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import moment from "moment";
import handleErrors from "../utils/errors.js";
import { withRouter } from "react-router-dom";
class TimeEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostPopularNewsId: ""
    };
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.getPopularNewsId = this.getPopularNewsId.bind(this);
  }
  handleIconClick() {
    this.props.history.push({
      pathname: "/bundle",
      state: {
        date: this.props.date
      }
    });
  }
  handleImageClick() {
    this.props.history.push({
      pathname: "/news",
      state: {
        newsId: this.state.mostPopularNewsId
      }
    });
  }
  getPopularNewsId() {
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
  componentDidMount() {
    this.getPopularNewsId();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.getPopularNewsId();
    }
  }
  render() {
    return (
      <VerticalTimelineElement
        date={moment(this.props.date)
          .utc()
          .format("LL")}
        icon={<i className="dot" />}
        iconOnClick={this.handleIconClick}
      >
        <img
          className="newsimage"
          // width="100px"
          height="100px"
          src="http://ichef.bbci.co.uk/news/976/cpsprodpb/12787/production/_95455657_3312a880-230e-474c-b1d9-bb7c94f8b00e.jpg"
          alt={this.mostPopularNewsId}
          onClick={this.handleImageClick}
        />
      </VerticalTimelineElement>
    );
  }
}
export default withRouter(TimeEvent);
