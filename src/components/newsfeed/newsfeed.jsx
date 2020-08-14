import React, { Component } from "react";
import Posts from "./posts";
import CreatePost from "./createpost";

class Newsfeed extends Component {
  state = {
    posts: [
      {
        id: 33,
        date: "August 20 2020",
        name: "Johan Sebastian Bach",
        content: "Something I want to learn about dog",
        likes: 123,
        liked: false,
        comments: 3,
      },
    ],
    value: "",
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  };

  handleSubmit = () => {
    let posts = [...this.state.posts];
    let newId = 0;
    const newPost = this.state.value;

    if (!this.state.value) {
      alert("Please write something tom post");
    } else {
      if (posts.length === 0) {
        posts.push({
          id: 1,
          date: "August 20 2020",
          name: "Johan Sebastian Bach",
          content: newPost,
          likes: 0,
          liked: false,
          comments: 0,
        });
        this.setState({ posts, value: "" });
      } else {
        this.state.posts[0].id
          ? (newId = this.state.posts[0].id + 1)
          : (posts = 1);
        posts.unshift({
          id: 1,
          date: "August 20 2020",
          name: "Johan Sebastian Bach",
          content: newPost,
          likes: 0,
          liked: false,
          comments: 0,
        });
        this.setState({ posts, value: "" });
        console.log(posts);
      }
    }
  };

  handleDelete = (id) => {
    let posts = this.state.posts.filter((el) => el.id !== id);
    this.setState({ posts });
  };
  handleLike = (el) => {
    console.log(`Like button clicked ${el.id}`);
    if (el.liked) {
      el.liked = false;
      el.likes -= 1;
    } else {
      el.liked = true;
      el.likes += 1;
    }
    this.setState({ posts: this.state.posts });
  };

  render() {
    return (
      <div>
        <CreatePost
          value={this.state.value}
          onChange={this.handleChange}
          addPost={this.handleSubmit}
        />
        {this.state.posts.map((el) => (
          <Posts
            key={el.id}
            id={el.id}
            onDelete={() => this.handleDelete(el.id)}
            value={el.content}
            likeCount={el.likes}
            commentCount={el.comments}
            name={el.name}
            isliked={() => this.handleLike(el)}
            color={el.liked}
          />
        ))}
      </div>
    );
  }
}

export default Newsfeed;
