import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Toolbar, Grid, Divider, IconButton } from "@material-ui/core";
import ImageAvatar from "./avatar";
import Popup from "../popup";
import Message from "../message";
import image from "../../images/defaultCoverPhoto.jpg";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { auth } from "firebase";
import AvatarChoose from "./avatarChoose";

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

export default function MediaCard() {
  const classes = useStyles();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [chooseAvatar, setChooseAvatar] = useState({
    open: false,
    target: "",
  });
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchData = async function () {
      const ref = db.collection("users").doc(auth().currentUser.uid);
      const collection = await ref.get();
      const data = collection.data();
      setAvatarUrl(data.avatar);
      setCoverPhoto(data.coverPhoto);
      setName(`${data.firstName}  ${data.lastName}`);
    };
    fetchData();
  });
  function toChoose(e) {
    console.log(e.target);
    switch (e.target.n) {
      case "avatar":
        alert("avatar");
        setChooseAvatar({ open: !chooseAvatar.open, target: "avatar" });
        break;
      case "coverPhoto":
        alert("cover");
        setChooseAvatar({ open: !chooseAvatar.open, target: "coverPhoto" });
        break;
    }
  }
  const cover = coverPhoto === "" ? image : coverPhoto;
  const account = (
    <Card className={classes.root}>
      <Toolbar />
      <CardMedia className={classes.media} image={cover} />
      <CardContent>
        <div className={classes.avatar}>
          <IconButton onClick={(e) => toChoose(e)} n="avatar">
            <ImageAvatar imageUrl={avatarUrl} />
          </IconButton>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
            <Typography variant="body2" color="textSecondary" component="p">
              <div className={classes.popups}>
                <Popup />
                <Button variant="outlined" size="small">
                  +
                </Button>
              </div>
            </Typography>
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
              component={Link}
              to="/profile/about"
            >
              About
            </Button>

            <Button
              className={classes.button}
              variant="contained"
              size="medium"
              color="primary"
              component={Link}
              to="/profile/photos"
            >
              Photos
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              size="medium"
              color="primary"
              component={Link}
              to="/profile/friends"
            >
              Friends
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              size="medium"
              color="primary"
              to="/profile/friends"
              onClick={(e) => toChoose(e)}
              n="coverPhoto"
            >
              Change cover Photo
            </Button>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <>
      <AvatarChoose form={{ ...chooseAvatar }} backToAccount={toChoose} />

      {account}
    </>
  );
}
