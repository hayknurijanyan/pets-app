import React, { Component } from "react";
export default class PhotoSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  imgChangePrev = () => {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
      });
    }
  };
  imgChangeNext = () => {
    if (this.state.index < this.props.images.length) {
      this.setState({
        index: this.state.index + 1,
      });
    }
  };
  render() {
    const index = 0;
    const rootStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    };
    return (
      <div>
        <button onClick={this.props.clickHandler}>asd</button>
        <div>
          <button key="prev" onClick={this.imgChangePrev}>
            prev
          </button>
          <img src={this.props.images[this.state.index].img} />
          <button key="next" onClick={this.imgChangeNext}>
            next
          </button>
        </div>
      </div>
    );
  }
}
