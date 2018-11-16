import React, { Component } from "react";

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [
        // Array of months to display on header
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],

      valueName: "",
      valueContent: "",
      valueTitle: ""
    };
    this.addNew = this.addNew.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if (e.target.name === "post") {
      this.setState({ valueContent: e.target.value });
    } else if (e.target.name === "user") {
      this.setState({ valueName: e.target.value });
    } else {
      this.setState({ valueTitle: e.target.value });
    }
  }
  addNew() {
    var d = new Date();
    let newDate = this.state.months[d.getMonth()] + ", " + d.getDay();
    let newPost = {
      user: this.state.valueName,
      title: this.state.valueTitle,
      content: this.state.valueContent,
      date: newDate,
      likes: 3
    };
    this.props.addPost(newPost);
    this.setState({
      valueName: "",
      valueContent: "",
      valueTitle: ""
    });
    console.log(newPost);
  }
  render() {
    return (
      <div className="post-form">
        <input
          placeholder="Username"
          name="user"
          onChange={this.handleChange}
          value={this.state.valueName}
        />
        <input
          placeholder="Title"
          name="title"
          onChange={this.handleChange}
          value={this.state.valueTitle}
        />
        <textarea
          placeholder="Post conent"
          name="post"
          onChange={this.handleChange}
          value={this.state.valueContent}
        />
        <button onClick={this.addNew}>Submit</button>
      </div>
    );
  }
}
