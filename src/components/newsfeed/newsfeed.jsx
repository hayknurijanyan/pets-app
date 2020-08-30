import React, { useState, useEffect } from "react";
import Post from "./post";
import CreatePost from "./createpost";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import uniqid from "uniqid";

let log = console.log;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Newsfeed() {
  const [currentUserId, setCurrentUserId] = useState("");
  const [UserID, setUserID] = useState("");
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const [postText, setPostText] = useState(true);
  const [fileUrl, setFileUrl] = useState("");
  const [userData, setUserData] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [postEditedValue, setPostEditedValue] = useState("");
  const [open, setOpen] = useState(false);

  // const userData = useSelector((state) => state.userData);
  // log("--------this is user", userData.firstName);

  useEffect(() => {
    async function fetchMyData() {
      const user = firebase.auth().currentUser;
      if (user) {
        const dbUserData = (
          await db.collection("users").doc(user.uid).get()
        ).data();
        setCurrentUserId(user.uid);
        setUserData(dbUserData);
      } else {
        console.log("user not found");
      }
    }
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
    fetchMyData();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setOpen(true);
      } else {
        log("redux not done");
      }
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const welcomeUser = () => {
    // return (
    //   <Alert onClose={handleClose} severity="success">
    //     Welcome back!
    //   </Alert>
    // );
  };

  const handleSubmit = async (e) => {
    const name = userData.firstName;
    const surname = userData.lastName;
    const fullname = `${name} ${surname}`;
    const myAvatar = userData.avatar;

    let today = new Date();
    let hours = today.getHours();
    String(today).slice(4, 21);
    let ampm = hours >= 12 ? "PM" : "AM";
    let dateTime = String(today).slice(4, 21) + " " + ampm;

    let postsArray = [...posts];
    let newId = Number(new Date()); //date id
    const newPost = value;

    if (!value && !fileUrl) {
      setPostText(false);
    } else {
      postsArray.unshift({
        postLikes: [],
        userAvatar: myAvatar,
        userID: currentUserId,
        id: newId,
        date: dateTime,
        name: fullname,
        content: newPost,
        likes: 0,
        liked: false,
        comments: 0,
        postImg: fileUrl,
        postComments: [],
      });
      //----------------------------------------------------------
      e.preventDefault();
      // if (!fileUrl) {
      //   return;
      // }
      const user = firebase.auth().currentUser;
      if (user) {
        db.collection("posts").add({
          postLikes: [],
          userAvatar: myAvatar,
          postImg: fileUrl,
          userID: user.uid,
          id: newId,
          date: dateTime,
          name: fullname,
          content: newPost,
          likes: 0,
          liked: false,
          comments: 0,
          postComments: [],
        });
      } else {
        log("user not found");
      }
      //------------------------------------------------------------
      setPosts(postsArray);
      setValue("");
      setFileUrl("");
      setPostText(true);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setCommentValue(value);
  };

  const handleCommentSubmit = (el) => {
    const name = userData.firstName;
    const surname = userData.lastName;
    const fullname = `${name} ${surname}`;
    const myAvatar = userData.avatar;
    const commentID = uniqid();
    // console.log("--------", commentValue.content);
    if (commentValue) {
      el.postComments.unshift({
        content: commentValue,
        userID: currentUserId,
        name: fullname,
        userAvatar: myAvatar,
        commentID,
      });
      let newComment = [el.postComments];
      setPostComments(newComment);
      setCommentValue("");

      db.collection("posts")
        .where("id", "==", el.id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection("posts")
              .doc(doc.id)
              .update({
                postComments: firebase.firestore.FieldValue.arrayUnion({
                  content: commentValue,
                  userID: currentUserId,
                  name: fullname,
                  userAvatar: myAvatar,
                  commentID,
                }),
              });
          });
        });
    } else {
      alert("enter value");
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`postImgs/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
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
  const hanleDeletePreview = () => {
    setFileUrl("");
  };

  const handleCommentDelete = (id, comments, el, postId) => {
    let newPost = [...posts];

    for (let i = 0; i < newPost.length; i++) {
      if (newPost[i].id === postId) {
        let newComments = comments.filter((el) => el.commentID !== id);
        let removeComment = comments.filter((el) => el.commentID === id);
        newPost[i].postComments = newComments;

        db.collection("posts")
          .where("id", "==", el.id)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              db.collection("posts")
                .doc(doc.id)
                .update({
                  postComments: firebase.firestore.FieldValue.arrayRemove({
                    content: removeComment[0].content,
                    userID: removeComment[0].userID,
                    name: removeComment[0].name,
                    userAvatar: removeComment[0].userAvatar,
                    commentID: removeComment[0].commentID,
                  }),
                });
            });
          });
      } else {
        console.log("comment not found");
      }
      setPosts(newPost);
    }
  };

  const handleSaveEdit = (el) => {
    el.content = postEditedValue;

    db.collection("posts")
      .where("id", "==", el.id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection("posts")
            .doc(doc.id)
            .update({ content: postEditedValue });
        });
      });
    setPostEditedValue("");
  };

  const handlePostEditChange = (newValue, el) => {
    setPostEditedValue(newValue);
  };

  const handleLike = (el) => {
    //   let postsArray = [];
    //   console.log(el.postLikes.length);
    //   if (el.postLikes.length === 0) {
    //     db.collection("posts")
    //       .where("id", "==", el.id)
    //       .get()
    //       .then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //           db.collection("posts")
    //             .doc(doc.id)
    //             .update({
    //               postLikes: firebase.firestore.FieldValue.arrayUnion({
    //                 userID: currentUserId,
    //               }),
    //             });
    //         });
    //       });
    //     el.liked = true;
    //     console.log("post liked 1st if", postsArray, el);
    //   } else {
    //     for (let i = 0; i < el.postLikes.length; i++) {
    //       if (el.postLikes[i].userID === currentUserId) {
    //         db.collection("posts")
    //           .where("id", "==", el.id)
    //           .get()
    //           .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //               db.collection("posts")
    //                 .doc(doc.id)
    //                 .update({
    //                   postLikes: firebase.firestore.FieldValue.arrayRemove({
    //                     userID: currentUserId,
    //                   }),
    //                 });
    //             });
    //           });
    //         el.liked = false;
    //         console.log("post unliked 2nd else", el.postLikes);
    //         break;
    //         // }} else {
    //         //   // let postsArray = [...posts];
    //         //   // setPosts(postsArray);
    //         //   db.collection("posts")
    //         //     .where("id", "==", el.id)
    //         //     .get()
    //         //     .then(function (querySnapshot) {
    //         //       querySnapshot.forEach(function (doc) {
    //         //         db.collection("posts")
    //         //           .doc(doc.id)
    //         //           .update({
    //         //             postLikes: firebase.firestore.FieldValue.arrayUnion({
    //         //               userID: currentUserId,
    //         //             }),
    //         //           });
    //         //       });
    //         //     });
    //         //   el.liked = true;
    //         //   postsArray = [...posts];
    //         //   setPosts(postsArray);
    //         //   console.log("post liked 3rd else", el.postLikes);
    //         // }
    //       }
    //     }
    //   }
    // };

    // } else {
    //   el.liked = false;
    //   let postsArray = [...posts];
    //   setPosts(postsArray);
    // }}
    //------------------------
    if (el.liked) {
      el.likes -= 1;
      el.liked = false;
    } else {
      el.liked = true;
      el.likes += 1;
    }
    let postsArray = [...posts];
    setPosts(postsArray);
    db.collection("posts")
      .where("id", "==", el.id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection("posts")
            .doc(doc.id)
            .update({ likes: el.likes, liked: el.liked });
        });
      });
  };
  return (
    <div>
      {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {welcomeUser()}
      </Snackbar> */}
      <CreatePost
        value={value}
        posttext={postText}
        onChange={handleChange}
        addPost={handleSubmit}
        fileChange={onFileChange}
        showImage={fileUrl}
        previewDelete={hanleDeletePreview}
      />
      {posts.map((el) => (
        <Post
          key={el.id}
          id={el.userID}
          currentUserId={currentUserId}
          userAvatar={el.userAvatar}
          name={el.name}
          value={el.content}
          onDelete={() => handleDelete(el.id)}
          onPostEditChange={(newValue) => handlePostEditChange(newValue, el)}
          onSaveEdit={() => handleSaveEdit(el)}
          date={el.date}
          text={el.content}
          likeCount={el.likes}
          isliked={() => handleLike(el)}
          color={el.liked}
          postImage={el.postImg}
          commentCount={el.postComments.length}
          postComments={el.postComments}
          addComment={() => handleCommentSubmit(el)}
          onCommentChange={handleCommentChange}
          commentValue={commentValue}
          onCommentDelete={(commentID) =>
            handleCommentDelete(commentID, el.postComments, el, el.id)
          }
        />
      ))}
    </div>
  );
}
export default Newsfeed;
