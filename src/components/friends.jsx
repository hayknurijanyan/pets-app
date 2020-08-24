import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
// import { isLoggedAction } from "../actions";
import { store } from "../index";
import Friend from "./friend.jsx";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import firebase from "firebase";
import { Card, Typography, Toolbar } from "@material-ui/core";

let log = console.log;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  root: {
    minHeight: 650,
  },
  header: {
    margin: 30,
  },
  typography: {
    minHeight: 400,
    marginTop: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 80,
  },
}));

function Friends() {
  const [friendList, setFriendList] = useState([]);
  let friendsCount = friendList.length;
  console.log(friendsCount);
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
  if (friendsCount === 0) {
    return (
      <div className={classes.typography}>
        <Toolbar />
        <Typography variant="h4" color="textSecondary">
          You are not following anyone
        </Typography>
      </div>
    );
  } else {
    return (
      <div>
        <Toolbar />
        <Card className={classes.root}>
          <Typography className={classes.header} variant="h5" color="primary">
            Following {friendsCount}
          </Typography>
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
        </Card>
      </div>
    );
  }
}

export default Friends;
