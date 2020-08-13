import React from "react";
import "./App.css";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Newsfeed from "./components/newsfeed";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Profile from "./components/profile";
import Friends from "./components/friends";
import Navbar from "./components/navbar";
import Services from "./components/services";
import Petfinder from "./components/petfinder";
import { makeStyles } from "@material-ui/core/styles";
import SidebarLeft from "./components/sidebarleft";
import SidebarRight from "./components/sidebarright";
import NotFound from "./components/notfound";
import Users from "./components/users";
import { useSelector } from "react-redux";
import firebase from "firebase";
import Logout from "./components/logout";
let log = console.log;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

function App() {
  const user = firebase.auth().currentUser;

  if (user) {
    log("currentuser", user);
  } else {
    log("user not loged");
  }

  const isUser = useSelector((state) => state.isUser);
  log("user redux", isUser);
  log("state", isUser);

  const userStatus = `User login status is ${isUser}`;
  const classes = useStyles();

  return user ? ( //checking if the user is Loged in
    <Router>
      <Navbar />
      <div className={classes.container}>
        <div>
          <SidebarLeft />
        </div>
        <div>
          <Switch>
            <Route path="/friends" component={Friends} />
            <Route path="/users" component={Users} />
            <Route path="/newsfeed" component={Newsfeed} />
            <Route path="/profile" component={Profile} />
            <Route path="/services" component={Services} />
            <Route path="/petfinder" component={Petfinder} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Newsfeed} />
            {/* <Redirect to='notfound'/> */}
          </Switch>
        </div>
        <div>
          <SidebarRight />
        </div>
      </div>
    </Router>
  ) : (
    //else
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={SignIn} />
        {/* <Redirect to='notfound'/> */}
      </Switch>
    </Router>
  );
}

export default App;