import React from "react";
import SidebarLeft from "./sidebarleft";
import SidebarRight from "./sidebarright";
import { Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import firebase from "firebase";
let log = console.log;

const Profile = () => {
  //   const user = firebase.auth().currentUser;

  //   if (user) {
  //     log("currnetuser", user);
  //   } else {
  //     log("asd");
  //   }

  const isUser = useSelector((state) => state);
  log("user redux", isUser);
  log("state", isUser);

  return (
    <div>
      <SidebarLeft />
      <Toolbar />
      <h1>Profile Page</h1>

      <SidebarRight />
    </div>
  );
};

export default Profile;
