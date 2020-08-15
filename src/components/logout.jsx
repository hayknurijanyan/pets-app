import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import * as firebase from "firebase";
import PetsSelectFiled from "./authentication/petsSecelctFiled";

import { useDispatch, useSelector } from "react-redux";
import { isUserAction } from "../actions";
import { Button } from "@material-ui/core";

const handleLogout = () => {
  firebase
    .auth()
    .signOut()
    // .then(() => alert("logout succsess"))
    .catch((e) => e.message);
  window.location.reload(false);
};

const Logout = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(isUserAction());
      } else {
        console.log("redux state.isUser is false");
      }
    });
  }, []);

  const dispatch = useDispatch();
  return (
    <Button
      Link="/signin"
      variant="contained"
      color="secondary"
      onClick={() => handleLogout()}
    >
      Logout
    </Button>
  );
};

export default Logout;
