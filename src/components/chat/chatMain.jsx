import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import firebase from "firebase";
import {
  Card,
  Toolbar,
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField,
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
  button: {
    margin: 10,
  },
  input: {
    marginTop: 50,
  },
}));

export default function ChatMain(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const [content, setContent] = useState("");
  const [user, setUser] = useState([]);
  const myRef = React.createRef();

  useEffect(async () => {
    const user = firebase.auth().currentUser;
    user ? setUser(user) : log("user not found");
    setReadError(null);
    setLoadingChats(true);
    const chatArea = myRef.current;
    try {
      firebase
        .database()
        .ref("chats")
        .on("value", (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });
          chats.sort(function (a, b) {
            return a.timestamp - b.timestamp;
          });
          setChats(chats);
          chatArea.scrollBy(0, chatArea.scrollHeight);
          setLoadingChats(false);
        });
    } catch (error) {
      setReadError(error.message);
      setLoadingChats(false);
    }
  }, []);

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const onSend = async (e) => {
    e.preventDefault();
    setWriteError(null);
    const chatArea = myRef.current;
    try {
      await firebase.database().ref("chats").push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
      });
      setContent("");
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      setWriteError(error.message);
    }
  };

  return (
    <>
      <div>
        <div className="chat-area" ref={myRef}>
          {/* loading indicator */}
          {loadingChats ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            ""
          )}
          {/* chat area */}
          {chats.map((chat) => {
            return (
              <p
                key={chat.timestamp}
                className={
                  "chat-bubble " + (user.uid === chat.uid ? "current-user" : "")
                }
              >
                {chat.content}
                <br />
                <span className="chat-time float-right">
                  {formatTime(chat.timestamp)}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      <TextField
        className={classes.input}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        placeholder="lastName"
        id="lastName"
        label="lastname"
        name="lastName"
        autoComplete="lname"
      />
      <label htmlFor="raised-button-file"></label>
      <Button
        onClick={onSend}
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Send
      </Button>
      <div className="py-5 mx-3">
        Login in as: <strong className="text-info">{user.email}</strong>
      </div>
    </>
  );
}
