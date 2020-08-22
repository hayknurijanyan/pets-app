import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import firebase from "firebase";
import { db, auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { userDataAction } from "../../actions";
import uniqid from "uniqid";
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
let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  inputArea: {
    margin: "5px",
  },
  chatArea: {
    display: "flex",
    flexDirection: "column",
    maxHeight: 500,
    overflow: "auto",
  },
  inputArea: {
    margin: "10px",
    width: "25ch",
  },
}));

export default function ChatWIthStyle() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const [content, setContent] = useState("");
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState({});
  const myRef = React.createRef();

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
            log("chats", chats);
            chats.sort(function (a, b) {
              return a.timestamp - b.timestamp;
            });
            setChats(chats);
            setLoadingChats(false);
          });
      } catch (error) {
        setReadError(error.message);
        setLoadingChats(false);
      }
    };
    fetchData();
  }, []);

  const data = useSelector((state) => state.userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const ref = db.collection("users").doc(auth.currentUser.uid);
        const collection = await ref.get();
        setUserData({ ...collection.data() });
        // dispatch(userDataAction({ ...collection.data() }));
      } catch (error) {
        log(error);
      }
    };
    fetchUserData();
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
      await firebase.database().ref("chats").push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
        avatar: userData.avatar,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      setContent("");
    } catch (error) {
      setWriteError(error.message);
    }
  };
  return (
    <>
      <CardContent className={classes.chatArea}>
        {chats.slice(chats.length - 150, chats.length).map((obj) => {
          return (
            <List key={uniqid()} className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={`${obj.firstName[0]}`}
                    src={`${obj.avatar}` || `/static/images/avatar/1.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText secondary={`${obj.firstName}  ${obj.lastName}`} />
                <ListItemText
                  primary={obj.content}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {formatTime(obj.timestamp)}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          );
        })}
      </CardContent>
      <Card>
        <TextField
          className={classes.inputArea}
          value={content}
          className={classes.input}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Enter your message"
          id="msg"
          label="Enter your message"
        />
        <label htmlFor="raised-button-file"></label>
        <Button
          className={classes.inputArea}
          disabled={content ? false : true}
          onClick={onSend}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          Send
        </Button>
      </Card>
    </>
  );
}
