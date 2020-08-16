import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fileUrlActionAsync } from "../../actions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  Card,
  Toolbar,
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
} from "@material-ui/core";
let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function UpLoad() {
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
    if (fileUrl) {
      dispatch(fileUrlActionAsync(fileUrl));
    } else log("not url");
    alert("upload completed");
  };

  const fileU = useSelector((state) => state);
  log("fileU", fileU);
  log("fileUrl", fileUrl);
  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     const username = e.target.username.value;
  //     if (!username || !fileUrl) {
  //       return;
  //     }
  //     await db.collection("users").doc(username).set({
  //       name: username,
  //       avatar: fileUrl,
  //     });
  //   };
  const a = "asd";
  useEffect(() => {
    log("fileU", fileU);
    // const fetchUsers = async () => {
    //   const usersCollection = await db.collection("img").get();
    //   setUsers(
    //     usersCollection.docs.map((doc) => {
    //       return doc.data();
    //     })
    //   );
    // };
    // fetchUsers();
  }, []);

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={onFileChange}
        placeholder="file"
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
        </Button>
      </label>

      {/* <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" placeholder="NAME" />
        <button>Submit</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.name}>
              <img width="100" height="100" src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </li>
          );
        })}
      </ul> */}
    </>
  );
}

export default UpLoad;
