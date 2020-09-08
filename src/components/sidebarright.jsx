import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import uniqid from "uniqid";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Avatar } from "@material-ui/core";
import ChatBox from "./chat/chatBox";
import firebase from "firebase";
import { db } from "../firebase.js";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import ChatContainer from "./chatSingle/chatContainer";
import ChatFabIcon from "./chatSingle/chatFabIcon";
import ChatMailIcon from "./chatSingle/chatMailIcon";
import SingleChatMain from "./chatSingle/singleChatMain";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ChatMain from "./chat/chatMain";
import { useSelector } from "react-redux";

let log = console.log;
const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  mail: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SidebarRight() {
  const classes = useStyles();
  const [friendList, setFriendList] = useState([]);
  const [user, setUser] = useState({});
  const [uid, setUid] = useState({});
  const [open, setOpen] = useState(false);
  const userFriend = useSelector((state) => state.userFriends);
  const mountedRef = useRef(true);

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
      } else {
        console.log("user not found");
      }
    }
    fetchMyData();
    return () => {
      mountedRef.current = false;
    };
  }, [userFriend]);

  const handlePersonClick = (uid) => {
    setUid(uid);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <Toolbar />
      <div className={classes.toolbar} />
      <List>
        {friendList.length ? (
          friendList.map((el) =>
            el.uid === user.uid ? null : (
              <div key={uniqid()}>
                <ListItem
                  button
                  key={el.email}
                  onClick={() => handlePersonClick(el.uid)}
                >
                  <ListItemIcon>
                    <Avatar
                      component={Link}
                      to="/profile/"
                      aria-label="recipe"
                      // className={classes.large}
                      src={el.avatar}
                      // imageUrl={avatarUrl}
                    />
                  </ListItemIcon>
                  <ListItemText primary={el.name} />
                </ListItem>
              </div>
            )
          )
        ) : (
          <ChatMain />
        )}

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Chat
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <SingleChatMain uid={uid} />
        </Dialog>
      </List>
      {friendList.length ? <ChatBox /> : null}
    </Drawer>
  );
}
