import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Toolbar,
  Grid,
  Divider,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import ImageAvatar from "./avatar";
import Popup from "../popup";
import Message from "../message";
import image from "../../images/defaultCoverPhoto.jpg";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import AvatarChoose from "./avatarChoose";
import CoverImageChoose from "./chooseCoverImage";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
  const [coverPhoto, setCoverPhoto] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [chooseAvatar, setChooseAvatar] = useState({
    open: false,
    target: "",
  });
  const [chooseCoverPhoto, setChooseCoverPhoto] = useState({
    open: false,
    target: "",
  });
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchData = async function () {
      const ref = db.collection("users").doc(auth.currentUser.uid);
      const collection = await ref.get();
      const data = collection.data();
      setAvatarUrl(data.avatar);
      setCoverPhoto(data.coverPhoto);
      setName(`${data.firstName}  ${data.lastName}`);
    };
    fetchData();
  }, []);
  const checkSuccessMessage = (suc) => {
    return (
      <Alert onClose={handleClose} severity="success">
        {suc.message}
      </Alert>
    );
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  function smthSet() {
    setSuccess({ message: "Photo changed" });
    checkSuccessMessage(success);
    setOpen(true);
  }
  function toChoose() {
    setChooseAvatar({ open: !chooseAvatar.open, target: "avatar" });
  }
  function toCoverPhotoChoose() {
    setChooseCoverPhoto({ open: !chooseCoverPhoto.open, target: "coverPhoto" });
  }
  const cover = coverPhoto === "" ? image : coverPhoto;
  const account = (
    <Card className={classes.root}>
      <Toolbar />
      <CardMedia className={classes.media} image={cover} />
      <CardContent>
        <div className={classes.avatar}>
          <IconButton onClick={() => toChoose()}>
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
              onClick={toCoverPhotoChoose}
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {checkSuccessMessage(success)}
      </Snackbar>
      <AvatarChoose
        form={{ ...chooseAvatar }}
        backToAccount={toChoose}
        snap={smthSet}
      />
      <CoverImageChoose
        form={{ ...chooseCoverPhoto }}
        backToAccount={toCoverPhotoChoose}
        snap={smthSet}
      />

      {account}
    </>
  );
}
