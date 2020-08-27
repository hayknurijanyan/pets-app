import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ImageAvatar from "../profile/avatar";
import { useSelector, useDispatch } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MuiAlert from "@material-ui/lab/Alert";
import { db } from "../../firebase";
import { auth } from "firebase";
import firebase from "firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 90,
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    marginLeft: 40,
    marginRight: 4,
  },
  media: {
    display: "flex",
    height: "30%",
    width: "30%",
    PaddingTop: "30%",
    margin: 30,
    marginLeft: 85,
  },
  card: {
    margin: 0,
    width: 590,
  },
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: red[500],
  },
  imgpreview: {
    display: "flex",
    flexDirection: "row",
  },
  deleteButton: {
    marginLeft: -40,
  },
}));

function CreatePost(props) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const [fileUrl, setFileUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    async function fetchMyData() {
      const user = firebase.auth().currentUser;
      if (user) {
        const dbUserData = (
          await db.collection("users").doc(user.uid).get()
        ).data();

        setAvatarUrl(dbUserData.avatar);
      } else {
        console.log("user not found");
      }
    }
    fetchMyData();
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const checkPost = () => {
    if (props.posttext) {
      return (
        <Alert onClose={handleClose} severity="success">
          Post Succeed!
        </Alert>
      );
    } else {
      return (
        <Alert onClose={handleClose} severity="error">
          Nothing to post!
        </Alert>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.main}>
            <ImageAvatar imageUrl={avatarUrl} />
            <TextField
              value={props.value}
              onChange={props.onChange}
              id="outlined-full-width"
              style={{ margin: 6 }}
              placeholder="What's on your mind"
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>
          {props.showImage && (
            <div className={classes.imgpreview}>
              <img
                className={classes.media}
                // image={props.showImage}
                src={props.showImage}
              />
              <div>
                <IconButton
                  className={classes.deleteButton}
                  onClick={props.previewDelete}
                >
                  <HighlightOffIcon />
                </IconButton>
              </div>
            </div>
          )}
          <div className={classes.buttons}>
            <div className={classes.button}>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={props.fileChange}
                placeholder="file"
              />
              <label htmlFor="raised-button-file">
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  component="span"
                  className={classes.button}
                  size="large"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Photo
                </Button>
              </label>
            </div>
            <div onClick={handleClick} className={classes.button}>
              <Button
                className={classes.button}
                onClick={props.addPost}
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                // onKeyPressed={(e) => keyPressed(e)}
              >
                Post
              </Button>
            </div>

            {/* <Button variant="contained" color="primary" onClick={props.addPost}>
              Post
            </Button> */}
          </div>
        </CardContent>
      </Card>
      <div style={{ marginTop: 50 }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          {checkPost()}
        </Snackbar>
      </div>
    </div>
  );
}

export default CreatePost;
