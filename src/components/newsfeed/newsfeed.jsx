import React, { Component } from "react";
import Posts from "./posts";
import CreatePost from "./createpost";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";




class Newsfeed extends Component {
  state = {
    posts: [],
    value: "",
  };

  componentDidMount() {
    db.collection("posts")
      .where("id", ">=", 0)
      .orderBy("id", "desc")
      .get()
      .then((snap) => {
        let posts = [];
        snap.forEach((doc) => {
          const dbData = { ...doc.data() };
          posts.push(dbData);
          console.log("posts", posts);
          this.setState({ posts });
        });
      });
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  };

  handleSubmit = () => {
    const fullname = "Hayk Nurijanyan";
    let today = new Date();
    let hours = today.getHours();
    String(today).slice(4, 21);
    let ampm = hours >= 12 ? "PM" : "AM";
    let dateTime = String(today).slice(4, 21) + " " + ampm;

    let posts = [...this.state.posts];
    let newId = Number(new Date());
    const newPost = this.state.value;

    if (!this.state.value) {
      alert("Please write something tom post");
    } else {
      if (posts.length === 0) {
        posts.push({
          id: newId,
          date: dateTime,
          name: fullname,
          content: newPost,
          likes: 0,
          liked: false,
          comments: 0,
        });
        this.setState({ posts, value: "" });
        db.collection("posts")
          .add({
            id: newId,
            date: dateTime,
            name: fullname,
            content: newPost,
            likes: 0,
            liked: false,
            comments: 0,
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      } else {
        posts.unshift({
          id: newId,
          date: dateTime,
          name: fullname,
          content: newPost,
          likes: 0,
          liked: false,
          comments: 0,
        });
        this.setState({ posts, value: "" });
        db.collection("posts")
          .add({
            id: newId,
            date: dateTime,
            name: fullname,
            content: newPost,
            likes: 0,
            liked: false,
            comments: 0,
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }
    }
  };

  handleDelete = (id) => {
    console.log(id);
    let posts = this.state.posts.filter((el) => el.id !== id);
    this.setState({ posts });
    let postsDB = db.collection("posts").where("id", "==", id);
    postsDB.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  };
  handleLike = (el) => {
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
            date={el.date}
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
