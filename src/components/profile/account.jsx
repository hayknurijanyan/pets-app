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
import image from "../../images/dg1.jpg";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { auth } from "firebase";
import AvatarChoose from "./avatarChoose";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "98%",
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
  const [chooseAvatar, setChooseAvatar] = useState({ open: false });
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchData = async function () {
      const ref = db.collection("users").doc(auth().currentUser.uid);
      const collection = await ref.get();
      const data = collection.data();
      setAvatarUrl(data.avatar);
      setName(`${data.firstName}  ${data.lastName}`);
    };
    fetchData();
  });
  function toChoose() {
    setChooseAvatar({ open: !chooseAvatar.open });
  }
  const account = (
    <Card className={classes.root}>
      <Toolbar />
      <CardMedia
        className={classes.media}
        image="https://coverfiles.alphacoders.com/927/92705.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <div className={classes.avatar}>
          <IconButton onClick={toChoose}>
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
