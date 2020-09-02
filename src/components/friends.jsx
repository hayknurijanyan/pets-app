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
import Loader from "./loader.jsx";

let log = console.log;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  root: {
    minHeight: 600,
    height: "100%",
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginTop: 10,
  },
}));

function Friends() {
  const [friendList, setFriendList] = useState([]);
  const [userData, setUserData] = useState({});

  let friendsCount = friendList.length;

  const classes = useStyles();

  useEffect(() => {
    async function fetchMyData() {
      const user = firebase.auth().currentUser;
      if (user) {
        const dbUserData = (
          await db.collection("users").doc(user.uid).get()
        ).data();
        setUserData(dbUserData);
        let friendsArray = [...dbUserData.friends];
        setFriendList(friendsArray);
      } else {
        console.log("user not found");
      }
    }
    fetchMyData();
  }, []);

  const handleUnfollow = (el, email) => {
    const friendEmail = el.email;
    const friendName = el.name;
    const friendAvatar = el.avatar;
    const friendUid = el.uid;

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
                  avatar: friendAvatar,
                  uid: friendUid,
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
  if (userData === undefined) {
    return (
      <>
        <Loader />
      </>
    );
  }

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
                avatar={el.avatar}
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
