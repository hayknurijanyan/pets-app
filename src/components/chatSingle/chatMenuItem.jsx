import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import ChatContainer from "./chatContainer";
import firebase from "firebase";
import { db } from "../../firebase.js";

import { MenuItem } from "@material-ui/core";

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

export default function ChatMenuItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [friendList, setFriendList] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchMyData() {
      try {
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
      } catch (err) {
        console.log(err);
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
      <MenuItem button onClick={handleClickOpen}>
        Inbox
      </MenuItem>
      <ChatContainer transition={Transition} open={open} close={handleClose} />
    </div>
  );
}
