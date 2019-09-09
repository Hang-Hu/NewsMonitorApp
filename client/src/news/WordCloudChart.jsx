import React, { Component } from "react";
import ReactWordcloud from "react-wordcloud";

export default class WordCloudChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      occurrences: []
    };
    this.computeWeight = this.computeWeight.bind(this);
  }
  computeWeight() {
    let map = {};
    for (let word of this.props.words.split(" ")) {
      if (map[word] === undefined) {
        map[word] = 1;
      } else {
        map[word]++;
      }
    }
    let occurrences = [];
    for (let prop in map) {
      occurrences.push({
        text: prop,
        value: map[prop]
      });
    }
    // console.log(occu);
    this.setState({
      occurrences: occurrences
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
      <div
      // style={{ backgroundColor: "#efefef", height: "300px", width: "100%" }}
      >
        <ReactWordcloud
          size={[this.props.width, 400]}
          options={{
            colors: [
              "#001f3f",
              "#0074D9",
              "#7FDBFF",
              "#39CCCC",
              "#3D9970",
              "#2ECC40",
              "#01FF70",
              "#FFDC00",
              "#FF851B",
              "#FF4136",
              "#85144b",
              "#F012BE",
              "#B10DC9",
              "#111111",
              "#AAAAAA",
              "#DDDDDD"
            ],
            enableTooltip: true,
            fontFamily: "Roboto",
            fontSizes: [10, 100],
            fontStyle: "normal",
            fontWeight: "normal",
            padding: 1,
            rotations: 1,
            rotationAngles: [0, 90],
            scale: "log",
            spiral: "rectangular",
            transitionDuration: 1000
          }}
          maxWords={100}
          words={this.state.occurrences}
        />
      </div>
    );
  }
}
