import React, { useState, useEffect } from "react";
import Posts from "./posts";
import CreatePost from "./createpost";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
let log = console.log;

function Newsfeed() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    db.collection("posts")
      .where("id", ">=", 0)
      .orderBy("id", "desc")
      .limit(20)
      .get()
      .then((snap) => {
        let posts = [];
        snap.forEach((doc) => {
          const dbData = { ...doc.data() };
          posts.push(dbData);
        });
        setPosts(posts);
      });
  }, []);

  useEffect(() => {
    // adding listeners everytime props.x changes
    return () => {
      // removing the listener when props.x changes
    };
  }, [fileUrl]);

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`postImgs/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const handleSubmit = async (e) => {
    const fullname = "Hayk Nurijanyan";

    let today = new Date();
    let hours = today.getHours();
    String(today).slice(4, 21);
    let ampm = hours >= 12 ? "PM" : "AM";
    let dateTime = String(today).slice(4, 21) + " " + ampm;
    console.log(dateTime);
    let postsArray = [...posts];
    let newId = Number(new Date());

    const newPost = value;

    if (!value && !fileUrl) {
      alert("Please write something to post");
    } else {
      postsArray.unshift({
        id: newId,
        date: dateTime,
        name: fullname,
        content: newPost,
        likes: 0,
        liked: false,
        comments: 0,
        postImg: fileUrl,
      });
      //----------------------------------------------------------
      e.preventDefault();
      // if (!fileUrl) {
      //   return;
      // }
      const user = firebase.auth().currentUser;
      if (user) {
        db.collection("posts").add({
          postImg: fileUrl,
          userID: user.uid,
          id: newId,
          date: dateTime,
          name: fullname,
          content: newPost,
          likes: 0,
          liked: false,
          comments: 0,
        });
      } else {
        log("user not found");
      }
      //------------------------------------------------------------
      setPosts(postsArray);
      setValue("");
      setFileUrl("");
    }
  };

  const handleDelete = (id) => {
    let postsArray = [...posts];
    postsArray = posts.filter((el) => el.id !== id);
    setPosts(postsArray);
    let postsDB = db.collection("posts").where("id", "==", id);
    postsDB
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error deleting document: ", error);
      });
  };

  const handleEdit = (id) => {
    console.log("edit-id", id);
    console.log(fileUrl);
  };

  const handleLike = (el) => {
    if (el.liked) {
      el.likes -= 1;
      el.liked = false;
    } else {
      el.liked = true;
      el.likes += 1;
    }
    let postsArray = [...posts];
    setPosts(postsArray);
  };

  return (
    <div>
      <CreatePost
        value={value}
        onChange={handleChange}
        addPost={handleSubmit}
        fileChange={onFileChange}
        showImage={fileUrl}
      />
      {posts.map((el) => (
        <Posts
          key={el.id}
          id={el.id}
          onDelete={() => handleDelete(el.id)}
          onEdit={() => handleEdit(el.id)}
          date={el.date}
          value={el.content}
          likeCount={el.likes}
          commentCount={el.comments}
          name={el.name}
          isliked={() => handleLike(el)}
          color={el.liked}
          postImage={el.postImg}
        />
      ))}
    </div>
  );
}
export default Newsfeed;
