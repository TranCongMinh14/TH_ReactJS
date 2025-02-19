import React, { useState } from "react";

class Childcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: "",
    };
  }

  handleInput = (event) => {
    console.log(event.target.value);
    this.setState({
      valueInput: event.target.value,
    });
  };
  render() {
    return (
      <div>
        <span>{this.state.valueInput}</span>
        <form onSubmit={this.props.handleOnSubmit}>
          <div>
            Your name:
            <input
              type="text"
              name="Name"
              value={this.props.Name}
              onChange={this.props.handleOnchangeInput}
            />
          </div>
          <div>
            Your Age:
            <input
              type="text"
              name="Age"
              value={this.props.Age}
              onChange={this.props.handleOnchangeInput}
            />
          </div>

          <button type="submit">Submit</button>
          <hr />
        </form>
      </div>
    );
  }
}
export default Childcomponent;
