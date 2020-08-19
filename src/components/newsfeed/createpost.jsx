import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ImageAvatar from "../profile/avatar";
import ImageIcon from "@material-ui/icons/Image";
import PostUpload from "./postupload";
import { db, auth, storage } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";

import { fileUrlActionAsync } from "../../actions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import firebase from "firebase";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 90,
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
    marginLeft: 80,
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
}));

function CreatePost(props) {
  const [text, setText] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const [fileUrl, setFileUrl] = useState("");
  const [users, setUsers] = useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    alert("upload completed");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!fileUrl) {
      return;
    }
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection("users").doc(user.uid).update({
        avatar: fileUrl,
      });
      alert("completed");
    } else {
      log("user not found");
    }
  };

  // const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.main}>
            <ImageAvatar>H</ImageAvatar>
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
                <IconButton onClick={props.previewDelete}>
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
            <div className={classes.button}>
              <Button
                className={classes.button}
                onClick={props.addPost}
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
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
    </div>
  );
}

export default CreatePost;
