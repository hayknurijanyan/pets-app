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
import defaultImage from "../../../images/defaultCoverPhoto.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "50rem",
    marginTop: 10,
    borderRadius: 20,
  },
  glob: {
    width: "100%",
    marginTop: "20px",
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
  const userId = props.match.params.id;
  const classes = useStyles();
  const [content, setContent] = useState("about");
  const [userData, setUserData] = useState(null);
  let imageHardcode = [];
  let petInfoHardcode = {};
  let userInfoHardcode = {};

  if (userData !== null) {
    petInfoHardcode = {
      name: userData.userPetInfo.name,
      age: userData.userPetInfo.age,
      gender: userData.userPetInfo.petsGender,
      behavior: userData.userPetInfo.behavior,
      breed: userData.userPetInfo.breed,
    };
    userInfoHardcode = {
      avatar: userData.avatar,
      coverPhoto: userData.coverPhoto,
      fName: userData.firstName,
      lName: userData.lastName,
      age: userData.age,
      gender: userData.maleFemale,
      city: userData.location.city,
      country: userData.location.country,
      profession: userData.profession,
      email: userData.email,
      number: userData.contactNumber,
    };
    imageHardcode = [...userData.photos];
  }
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
      setUserData({ ...collection.data() });
    }
    fetchMyData();
  }, []);
  switch (content) {
    case "about":
      toRender = (
        <XalxiAbout
          petInfo={{ ...petInfoHardcode }}
          userInfo={{ ...userInfoHardcode }}
          className={classes.glob}
        />
      );
      break;
    case "photos":
      toRender = <XalxiImages images={imageHardcode} userId={userId} />;
      break;
    case "friends":
      toRender = <XalxiFriends />;
      break;
  }

  return (
    <div className={classes.glob}>
      <Card className={classes.glob}>
        <Toolbar />
        <CardMedia
          className={classes.media}
          image={
            userInfoHardcode.coverPhoto === ""
              ? defaultImage
              : userInfoHardcode.coverPhoto
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className={classes.avatar}>
            <ImageAvatar imageUrl={userInfoHardcode.avatar} />

            <Typography gutterBottom variant="h5" component="h2">
              {`${userInfoHardcode.fName} ${userInfoHardcode.lName}`}
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
