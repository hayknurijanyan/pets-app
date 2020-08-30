import React, { useState, useEffect } from "react";
import {
  Toolbar,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Account from "../account";
import About from "../about";
import { useSelector } from "react-redux";
import firebase from "firebase";
import ImageGridList from "../myImages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Friends from "../../friends";
import AllPets from "../../allpets";
import FriendsCard from "../friendscard";
import PetsCard from "../petscard";
import ImageAvatar from "../avatar";
import Message from "../../message";
import XalxiAbout from "./xalxiAbout";
import XalxiImages from "./xalxiImages";
import XalxiFriends from "./xalxiFriends";
import { db } from "../../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "50rem",
    marginTop: 10,
    borderRadius: 20,
  },
  media: {
    marginTop: -40,
    height: 280,
  },
  buttons: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    margin: 2,
  },
  popups: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));
const XalxiProfile = (props) => {
  const classes = useStyles();
  const [content, setContent] = useState("about");
  const [userData, setUserData] = useState({});
  const userId = "6Qwqbg4PP9exnVSZRK6QuRLwy6d2";
  let data = null;
  const petInfoHardcode = {
    name: "Jako",
    age: 5,
    gender: "male",
    behavior: "lazy",
    breed: "tuzik",
  };
  const userInfoHardcode = {
    fName: "Poxos",
    lName: "poxosyan",
    age: 99,
    gender: "male",
    city: "San Francisco",
    country: "Mozambik",
    profession: "Pinachi",
    email: "dzempchem@drel.dxk",
    number: "077777777",
  };
  const imageHardcode = [
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
    "https://coverfiles.alphacoders.com/927/92705.jpg",
  ];
  let toRender = null;
  function toFriends() {
    setContent("friends");
  }
  function toPhotos() {
    setContent("photos");
  }
  function toAbout() {
    setContent("about");
  }
  useEffect(() => {
    async function fetchMyData() {
      const ref = db.collection("users").doc(userId);
      const collection = await ref.get();
      data = { ...collection.data() };

      fetchMyData();
    }
  }, []);
  setUserData(data);
  console.log(userData, "cccccccccccccccccccccccccccc");
  const avatarUrl = "https://coverfiles.alphacoders.com/927/92705.jpg";
  switch (content) {
    case "about":
      toRender = (
        <XalxiAbout
          petInfo={{ ...petInfoHardcode }}
          userInfo={{ ...userInfoHardcode }}
        />
      );
      break;
    case "photos":
      toRender = <XalxiImages images={imageHardcode} />;
      break;
    case "friends":
      toRender = <XalxiFriends />;
      break;
  }

  return (
    <div>
      <Card className={classes.root}>
        <Toolbar />
        <CardMedia
          className={classes.media}
          image="https://coverfiles.alphacoders.com/927/92705.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className={classes.avatar}>
            <ImageAvatar imageUrl={avatarUrl} />

            <Typography gutterBottom variant="h5" component="h2">
              {userData.firstName}
            </Typography>
          </div>
          <Grid container className={classes.buttons}>
            <div>
              <Message />
            </div>
            <div>
              <Button
                className={classes.button}
                variant="contained"
                size="medium"
                color="primary"
                onClick={toAbout}
              >
                About
              </Button>

              <Button
                className={classes.button}
                variant="contained"
                size="medium"
                color="primary"
                onClick={toPhotos}
              >
                Photos
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                size="medium"
                color="primary"
                onClick={toFriends}
              >
                Friends
              </Button>
            </div>
          </Grid>
        </CardContent>
      </Card>
      {toRender}
    </div>
  );
};

export default XalxiProfile;
