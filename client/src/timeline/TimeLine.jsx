import React, { Component } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./timeline.css";
import TimeEvent from "./TimeEvent";
import handleErrors from "../utils/errors.js";

export default class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dateArr: []
    };
    this.getAllDates = this.getAllDates.bind(this);
  }
  getAllDates() {
    const url = "/api/news/all/dates";
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
              dateArr: data
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
    this.getAllDates();
  }
  // componentDidUpdate(prevProps){
  // }
  render() {
    return (
      <VerticalTimeline>
        {this.state.dateArr.map(date => (
          <TimeEvent key={date} date={date} />
        ))}
      </VerticalTimeline>
    );
  }
}
