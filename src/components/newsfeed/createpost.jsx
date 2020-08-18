import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, TextField, Button } from "@material-ui/core";
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

let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 90,
  },
  iconbuttons: {
    display: "flex",
    flexDirection: "row",
    marginRight: 2,
    alignItems: "center",
  },
  buttons: {
    marginLeft: 80,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photobutton: {
    alignItems: "center",
    marginLeft: 5,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
            {/* <InputEmoji
              value={props.value}
              onChange={props.onChange}
              cleanOnEnter
              placeholder="What's on your mind"
            /> */}
          </div>
          <div className={classes.buttons}>
            <div className={classes.iconbuttons}>
              {/* <Button variant="outlined" onClick={props.addPost}>
                <ImageIcon />
                <Typography className={classes.photobutton}>
                  Add Photo
                </Typography>
              </Button> */}
              <div className={classes.buttons}>
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
                    variant="contained"
                    color="primary"
                    component="span"
                    className={classes.button}
                    size="small"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload File
                  </Button>
                </label>
                <Button
                  onClick={props.addPost}
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Post
                </Button>
              </div>
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
