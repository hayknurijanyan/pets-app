import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
// import { isLoggedAction } from "../actions";
import { store } from "../index";
import Friend from "./friend.jsx";
import { makeStyles } from "@material-ui/core/styles";

let log = console.log;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
  },

  main: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 80,
  },
}));

function Friends() {
  const classes = useStyles();

  useEffect(() => {
    const ref = db.collection("users").doc("asd");
    const collection = ref.get();
    const a = collection.then((asd) => asd);
    // log("db result", a);
  });

  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div className={classes.main}>
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
    </div>
  );
}

export default Friends;
