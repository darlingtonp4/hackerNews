import React, { Component } from "react";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.handleRemovePost = this.handleRemovePost.bind(this);
  }
  handleRemovePost(id) {
    this.props.removePost(id);
  }
  render() {
    return (
      <div>
        {this.props.posts.map((post, index) => (
          <div className="post" key={index}>
            {console.log(index)}
            <div>
              <h1 className="title">{post.title}</h1>
              <span> {post.content}</span>
            </div>

            <div className="userdate">
              Username: {post.user} <br />
              Date: {post.date}
            </div>
            <div className="likesdel">
              <span> Likes {post.likes} </span>
              <span
                className="deletebtn"
                onClick={() => this.handleRemovePost(post.id)}
              >
                Delete Post
              </span>{" "}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
