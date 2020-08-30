import React, { useEffect } from "react";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Avatar } from "@material-ui/core";
import ChatBox from "./chat/chatBox";
import { useState } from "react";
import firebase from "firebase";
import { db } from "../firebase.js";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import ChatContainer from "./chatSingle/chatContainer";
const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
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
}));

export default function SidebarRight() {
  const classes = useStyles();
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
      <Divider />
      <List>
        {friendList.map((el) =>
          el.uid === user.uid ? null : (
            <div>
              <ListItem button key={el.email}>
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
        )}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
      <ChatBox />
      <ChatContainer />
    </Drawer>
  );
}
