import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { isLoggedAction } from "../actions";

import Friend from "./../../friend.jsx";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { storage, auth, db } from "../../../firebase";
import { Card, Typography, Toolbar } from "@material-ui/core";
import Loader from "./../../loader.jsx";

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

function XalxiFriends(props) {
  const [friendList, setFriendList] = useState([]);
  const [userData, setUserData] = useState();
  let friendsCount = friendList.length;

  const classes = useStyles();
  const userId = "6Qwqbg4PP9exnVSZRK6QuRLwy6d2";
  useEffect(() => {
    async function fetchMyData() {
      if (userId) {
        const dbUserData = (
          await db.collection("users").doc(userId).get()
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

    let friendsArray = [...friendList];
    friendsArray = friendList.filter((e) => e.email !== email);

    setFriendList(friendsArray);

    const user = auth.currentUser;
    if (user) {
      db.collection("users")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection("users")
              .doc(doc.id)
              .update({
                friends: db.FieldValue.arrayRemove({
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

export default XalxiFriends;
