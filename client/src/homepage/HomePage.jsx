import React, { Component } from "react";
import "./homepage.css";
import handleErrors from "../utils/errors.js";
import HomeCard from "./HomeCard";
export default class HomePage extends Component {
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

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.dateArr.map(date => (
          <HomeCard key={date} date={date} />
        ))}
      </div>
    );
  }
}
