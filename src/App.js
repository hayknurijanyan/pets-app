import React, { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./components/authentication/signin";
import SignUp from "./components/authentication/signup";
import Newsfeed from "./components/newsfeed/newsfeed";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Profile from "./components/profile/profile";
import Friends from "./components/friends";
import Navbar from "./components/navbar";
import Petfinder from "./components/petsFinder/petfinder";
import { makeStyles } from "@material-ui/core/styles";
import NotFound from "./components/notfound";
import Users from "./components/displayUsers/users";
import firebase from "firebase";
// import Logout from "./components/logout";

import { useDispatch, useSelector } from "react-redux";
import { isUserAction, authStateChangeAction } from "./actions";
import Loader from "./components/loader";
import Services from "./components/services/services";
import SidebarRight from "./components/sidebarright";
import SidebarLeft from "./components/sidebarleft";
import { Hidden } from "@material-ui/core";

let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(authStateChangeAction(user));
    });
  }, []);
  // const user = firebase.auth().currentUser;
  // if (user) {
  //   log("currentuser", user);
  // } else {
  //   log("user not loged");
  // }
  const user = useSelector((state) => state.user);
  // log("user isUser state", isUser);

  const classes = useStyles();

  if (user === false) {
    return <Loader />;
  }

  return !user ? ( //checking if the user is Loged in
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={SignIn} />
        {/* <Redirect to='notfound'/> */}
      </Switch>
    </Router>
  ) : (
    <Router>
      <Navbar />
      <div className={classes.root}>
        <Hidden mdDown>
          <SidebarLeft />
        </Hidden>
        <main className={classes.content}>
          <Switch>
            <Route path="/friends" component={Friends} />
            <Route path="/users" component={Users} />
            <Route path="/newsfeed" component={Newsfeed} />
            <Route path="/profile" component={Profile} />
            <Route path="/services" component={Services} />
            <Route path="/petfinder" component={Petfinder} />
            <Route path="/notfound" component={NotFound} />
            {/* <Route path="/logout" component={Logout} /> */}
            <Route path="/" component={Newsfeed} />
            {/* <Redirect to='notfound'/> */}
          </Switch>
        </main>
        <Hidden mdDown>
          <SidebarRight />
        </Hidden>
      </div>
    </Router>
  );
  //  isUser.user === undefined ? (
  //   <Loader />
  // ) : (
  //   log("asd")
}

export default App;
