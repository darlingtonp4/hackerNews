import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Post from "./Post";
import PostForm from "./PostForm";
import { DB_CONFIG } from "./config";
import firebase from "firebase";
import "firebase/database";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("notes");
    this.addPost = this.addPost.bind(this);
    this.removePost = this.removePost.bind(this);
  }
  addPost(post) {
    this.database.push().set(post);
  }
  removePost(postId) {
    this.database.child(postId).remove();
  }
  componentWillMount() {
    const previousPosts = this.state.posts;
    this.database.on("child_added", snap => {
      previousPosts.push({
        id: snap.key,
        user: snap.val().user,
        content: snap.val().content,
        date: snap.val().date,
        title: snap.val().title,
        like: snap.val().like
      });
      this.setState({ posts: previousPosts });
    });
    this.database.on("child_removed", snap => {
      for (var i = 0; i < previousPosts.length; i++) {
        if (previousPosts[i].id === snap.key) {
          previousPosts.splice(i, 1);
        }
      }

      this.setState({
        notes: previousPosts
      });
    });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar />
          <div className="content">
            <PostForm addPost={this.addPost} />
            <Post
              removePost={this.removePost}
              id={10}
              posts={this.state.posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
