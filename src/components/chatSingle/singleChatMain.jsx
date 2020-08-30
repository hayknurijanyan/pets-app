import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import firebase from "firebase";
import Loader from "./loader";
import "./styles.css";
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
  CardContent,
} from "@material-ui/core";
import useCurrentUserData from "../customHooks/useCurrentUserData";

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
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  input: {},
  chatArea: {
    display: "flex",
    flexDirection: "column-reverse",
    height: "100%",
    overflow: "auto",
    marginBottom: 0,
  },
  inputArea: {},
}));

export default function SingleChatMain(props) {
  const { fullName, email, uid: friendUid } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const [content, setContent] = useState("");
  const [user, setUser] = useState([]);

  const myRef = React.createRef();
  const userData = useCurrentUserData();

  useEffect(() => {
    const fetchData = async () => {
      const user = firebase.auth().currentUser;
      user ? setUser(user) : log("user not found");
      setReadError(null);
      setLoadingChats(true);
      const chatArea = myRef.current;
      const chats1 = [];

      try {
        firebase
          .database()
          .ref("singleChat")
          .child(`${user.uid}${friendUid}`) // draw aa=> mine bb => his  aabb
          .child("message")
          .on("value", (snapshot) => {
            snapshot.forEach((snap) => {
              chats1.push(snap.val());
            });
            chats1.sort(function (a, b) {
              return a.timestamp - b.timestamp;
            });
            setChats(chats1);
            chatArea.scrollBy(0, chatArea.scrollHeight);
            setLoadingChats(false);
          });
        firebase
          .database()
          .ref("singleChat")
          .child(`${friendUid}${user.uid}`) // draw hisId myId
          .child("message")
          .on("value", (snapshot) => {
            const chats2 = [...chats1];
            snapshot.forEach((snap) => {
              chats2.push(snap.val());
            });
            chats2.sort(function (a, b) {
              return a.timestamp - b.timestamp;
            });
            setChats(chats2);
            chatArea.scrollBy(0, chatArea.scrollHeight);
            setLoadingChats(false);
          });
      } catch (error) {
        log("error", error.message);
        setReadError(error.message);
        setLoadingChats(false);
      }
    };
    fetchData();
  }, []);

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:`;
    const min = d.getMinutes();
    let a = "0";
    if (min < 10) {
      a += min;
      return time + a;
    } else {
      return time + min;
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const onSend = async (e) => {
    e.preventDefault();
    setWriteError(null);
    const chatArea = myRef.current;
    try {
      await firebase
        .database()
        .ref("singleChat")
        .child(`${friendUid}${user.uid}`)
        .child("message")
        .push({
          content: content,
          timestamp: Date.now(),
          uid: user.uid,
          avatar: userData.avatar,
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
      setContent("");
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      log("error", error.message);
      setWriteError(error.message);
    }
  };

  return (
    <>
      <Card className={classes.chatArea}>
        {/* <CardContent className={classes.chatArea}> */}
        <div className="chat-area" ref={myRef}>
          {/* loading indicator */}
          {loadingChats ? <Loader /> : ""}
          {/* chat area */}
          {chats.slice(chats.length - 150, chats.length).map((chat) => {
            return (
              <div>
                <p
                  key={chat.timestamp}
                  className={
                    "chat-bubble " +
                    (user.uid === chat.uid ? "current-user" : "")
                  }
                >
                  {/* <span className="avatar">
                    <ListItemAvatar>
                      <Avatar
                        alt={`${chat.firstName[0]}`}
                        src={`${chat.avatar}` || `/static/images/avatar/1.jpg`}
                      />
                    </ListItemAvatar>
                  </span> */}
                  <span className="name-color">{`${chat.firstName} ${chat.lastName}`}</span>
                  <br />
                  <span className="content">{chat.content}</span>
                  <br />
                  <span className="chat-time float-right">
                    {formatTime(chat.timestamp)}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
        {/* </CardContent> */}
      </Card>
      <Card className={classes.inputArea}>
        <CardContent>
          <TextField
            value={content}
            className={classes.input}
            value={content}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            placeholder="Enter your message"
            id="msg"
          />
          <label htmlFor="raised-button-file"></label>
          <Button
            disabled={content ? false : true}
            onClick={onSend}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            disabled={content ? false : true}
          >
            Send
          </Button>
        </CardContent>
      </Card>
    </>
  );
}