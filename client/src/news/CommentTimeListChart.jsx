import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

export default class CommentTimeListChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      options: {}
    };
    this.computeWeight = this.computeWeight.bind(this);
  }
  computeWeight() {
    let timeArr = this.props.commentTimeStr.split(",");
    let map = {};
    // console.log(timeArr);
    for (let timeStr of timeArr) {
      let time = moment(timeStr, "hh:mm a D MMM YYYY").set({
        minute: 0,
        second: 0,
        millisecond: 0
      });
      // .format("YYYY-MMM-D HH");

      // console.log(time instanceof moment);
      // console.log(time);
      if (map[time] !== undefined) {
        map[time]++;
      } else {
        map[time] = 1;
      }
    }
    // console.log(map);
    let dataList = [];
    for (let prop in map) {
      dataList.push({
        datetime: moment(prop).format("YYYY-MMM-D HH"),
        freq: map[prop]
      });
    }
    // console.log(typeof dataList[0].datetime);
    dataList = dataList.sort((a, b) => a.datetime - b.datetime);
    // console.log(dataList);
    let xData = dataList.map(x => x.datetime);
    let yData = dataList.map(x => x.freq);

    // let map = {};
    // for (let word of this.props.words.split(" ")) {
    //   if (map[word] === undefined) {
    //     map[word] = 1;
    //   } else {
    //     map[word]++;
    //   }
    // }
    // let occurrences = [];
    // for (let prop in map) {
    //   occurrences.push({
    //     text: prop,
    //     value: map[prop]
    //   });
    // }
    // console.log(occu);
    this.setState({
      options: {
        title: {
          text: "Comments Per Hour"
        },
        xAxis: {
          categories: xData
        },
        yAxis: {
          title: {
            text: "Frequency"
          }
        },
        series: [
          {
            name: "Hour",
            data: yData
          }
        ]
      }
    });
  }
  componentDidMount() {
    this.computeWeight();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.words !== this.props.words) {
      this.computeWeight();
    }
  }
  render() {
    return (
      <div>
        {this.state.options && (
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state.options}
          />
        )}
      </div>
    );
  }
}
