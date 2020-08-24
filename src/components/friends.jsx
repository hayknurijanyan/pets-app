import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
// import { isLoggedAction } from "../actions";
import { store } from "../index";
import Friend from "./friend.jsx";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import firebase from "firebase";

let log = console.log;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
  },

  main: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 80,
  },
}));

function Friends() {
  const [friendList, setFriendList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchMyData() {
      const user = firebase.auth().currentUser;
      if (user) {
        const dbUserData = (
          await db.collection("users").doc(user.uid).get()
        ).data();
        let friendsArray = [...dbUserData.friends];
        setFriendList(friendsArray);
        console.log(dbUserData.friends);
      } else {
        console.log("user not found");
      }
    }
    fetchMyData();
  }, []);

  const handleUnfollow = (el, email) => {
    const friendEmail = el.email;
    const friendName = el.name;

    let friendsArray = [...friendList];
    friendsArray = friendList.filter((e) => e.email !== email);

    setFriendList(friendsArray);

    const user = firebase.auth().currentUser;
    if (user) {
      db.collection("users")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection("users")
              .doc(doc.id)
              .update({
                friends: firebase.firestore.FieldValue.arrayRemove({
                  name: friendName,
                  email: friendEmail,
                }),
              });
          });
        });
    } else {
      alert("user not found");
    }
  };

  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div className={classes.main}>
      {friendList.map((el) => (
        <Friend
          key={el.email}
          name={el.name}
          email={el.email}
          onUnfollow={() => handleUnfollow(el, el.email)}
        />
      ))}
    </div>
  );
}

export default Friends;
