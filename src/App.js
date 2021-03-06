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
  useRouteMatch,
} from "react-router-dom";
import Profile from "./components/profile/profile";
import Friends from "./components/friends";
import Navbar from "./components/navbar";
import Petfinder from "./components/petsFinder/petfinder";
import { makeStyles } from "@material-ui/core/styles";
import Users from "./components/displayUsers/users";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { isUserAction, authStateChangeAction } from "./actions";
import Loader from "./components/loader";
import Services from "./components/services/services";
import SidebarRight from "./components/sidebarright";
import SidebarLeft from "./components/sidebarleft";
import { Hidden } from "@material-ui/core";
import ChatButton from "./components/chat/chatButton";
import ChatBox from "./components/chat/chatBox";
import ChatContainer from "./components/chatSingle/chatContainer";
import ForgotPassword from "./components/authentication/forgotPassword";
import FriendsCard from "./components/profile/friendscard";
import NotFound from "./components/notfound";
import XalxiProfile from "./components/profile/xalxiProfile/xalxiProfile";

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
  // let match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      firebase.auth().onAuthStateChanged((user) => {
        dispatch(authStateChangeAction(user));
      });
    }
    return () => {
      unmounted = true;
    };
  }, []);

  const user = useSelector((state) => state.user);

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
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/" component={SignIn} />
        {/* <Redirect to="newsfeed" /> */}
      </Switch>
    </Router>
  ) : (
    <Router>
      {/* <Switch>
        <Route path="/notfound" component={NotFound} />
      </Switch> */}
      <Navbar />
      <Route path="/notfound" component={NotFound} />
      <div className={classes.root}>
        <Hidden mdDown>
          <SidebarLeft />
        </Hidden>
        <main className={classes.content}>
          <Switch>
            <Route path="/friends" component={Friends} />
            <Route path="/users" component={Users} />
            <Route path="/newsfeed" component={Newsfeed} />
            <Route path="/signin" component={Newsfeed} refresh="true" />
            <Route path="/profile" component={Profile} />
            <Route path="/services" component={Services} />
            <Route path="/petfinder" component={Petfinder} />
            {/* <Route path="/:id" component={XalxiProfile} /> */}
            <Route
              path="/:id"
              render={(props) => (
                <XalxiProfile {...props} title={`Props through render`} />
              )}
            />
            {/* <Route path="/logout" component={Logout} /> */}
            <Route path="/" exact component={Newsfeed} />
            <Redirect to="/notfound" component={NotFound} />
          </Switch>
        </main>
        <ChatBox />
        <ChatContainer />
        <Hidden mdDown>
          <SidebarRight />
        </Hidden>
      </div>
    </Router>
  );
}

export default App;
