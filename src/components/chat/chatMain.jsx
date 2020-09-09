import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import logger from "../../services/logService";
import firebase from "firebase";
import Loader from "./loader";
import uniqid from "uniqid";
import "./styles.css";
import { Card, TextField, Button, CardContent } from "@material-ui/core";
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

export default function ChatMain() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const [content, setContent] = useState("");
  const [user, setUser] = useState([]);
  const myRef = React.createRef();
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
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
            if (!mountedRef.current) return null;

            setChats(chats);
            chatArea.scrollBy(0, chatArea.scrollHeight);
            setLoadingChats(false);
          });
      } catch (error) {
        logger.log(error);
        setReadError(error.message);
        setLoadingChats(false);
      }
    };
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const userData = useCurrentUserData();

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
      await firebase.database().ref("chats").push({
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
      setWriteError(error.message);
      logger.log(error);
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
              <div key={uniqid()}>
                <p
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
