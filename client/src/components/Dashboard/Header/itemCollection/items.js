import React, { Component } from "react";

class Item extends Component {
  state = {
    count: 1
  };

  deleteItem = () => {
    alert("Hey there");
  };

  minusCount = () => {
    if (this.state.count === 1) {
      this.deleteItem();
    } else {
      this.setState({
        count: this.state.count - 1
      });
    }
  };
  plusCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  
  render() {
   
  }
}
