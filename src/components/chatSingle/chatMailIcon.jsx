import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import SingleChatMain from "./singleChatMain";
import ChatContainer from "./chatContainer";
import firebase from "firebase";
import { db } from "../../firebase.js";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import MailIcon from "@material-ui/icons/Mail";
import ChatBoxOpen from "./chatBoxOpen";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  fab: {
    marginRight: "100px",
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
  // fab: {
  //   marginRight: "100px",
  //   position: "fixed",
  //   bottom: theme.spacing(3),
  //   right: theme.spacing(4),
  // },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatMailIcon(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [friendList, setFriendList] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchMyData() {
      const user = firebase.auth().currentUser;
      if (user) {
        setUser(user);
        const dbUserData = (
          await db.collection("users").doc(user.uid).get()
        ).data();
        let friendsArray = [...dbUserData.friends];
        setFriendList(friendsArray);
        // console.log(dbUserData.friends);
      } else {
        console.log("user not found");
      }
    }
    fetchMyData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logSomth = (email) => {
    console.log("email", email);
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Mail" />
      </ListItem>
      <ChatContainer transition={Transition} open={open} close={handleClose} />
    </div>
  );
}
