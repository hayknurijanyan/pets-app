import React, { useEffect, useState } from "react";
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
import firebase from "firebase";
import { db } from "../../firebase.js";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ChatBoxOpen from "./chatBoxOpen";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
let log = console.log;

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatContainer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    async function fetchMyData() {
      const user = firebase.auth().currentUser;
      if (user) {
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
    log("email", email);
  };

  return (
    <div>
      <Fab color="primary" onClick={handleClickOpen} className={classes.fab}>
        <QuestionAnswerIcon />
      </Fab>
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
        <List>
          {friendList.map((el) => (
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
              <ChatBoxOpen email={el.email} fullName={el.name} uid={el.uid} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
