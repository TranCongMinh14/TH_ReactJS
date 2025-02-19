import React, { useState } from "react";

import Childcomponent from "./Childcomponent";

import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";
class MyComponents extends React.Component {
  state = {
    Name: "",
    listUser: [
      { id: 1, Name: "Minh", Age: 20 },
      { id: 2, Name: "Linh", Age: 12 },
      { id: 3, Name: "Trang", Age: 31 },
      { id: 4, Name: "Hoa", Age: 52 },
    ],
  };

  parent = "This is my parents";
  handleOnchangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.Age);
    const newUser = {
      id: Math.floor(Math.random() * 100 + 1) + "user",
      Name: this.state.Name,
      Age: this.state.Age,
    };
    this.handleAddnewUser(newUser);
    this.setState({ name: "", age: "" });
  };
  handleAddnewUser = (userObject) => {
    this.setState({
      listUser: [userObject, ...this.state.listUser],
    });
  };
  //Xoa 1 User
  handleDeleteUser = (userID) => {
    let listUserClone = this.state.listUser;
    listUserClone = listUserClone.filter((item) => item.id !== userID);
    this.setState({
      listUser: listUserClone,
    });
  };

  render() {
    return (
      <>
        <div>
          <h2>MyComponent</h2>
          <Childcomponent
            Name={this.state.Name}
            handleOnchangeInput={this.handleOnchangeInput}
            handleOnSubmit={this.handleOnSubmit}
          />

          <DisplayInfor
            listUser={this.state.listUser}
            handleDeleteUser={this.handleDeleteUser}
          ></DisplayInfor>

          <AddUserInfor></AddUserInfor>
        </div>
      </>
    );
  }
}
export default MyComponents;
