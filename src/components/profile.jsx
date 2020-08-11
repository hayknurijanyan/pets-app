import React from "react";
import { Toolbar } from "@material-ui/core";
import Account from "./account";
import About from "./about";
import { useSelector } from "react-redux";
import firebase from "firebase";
import ImageGridList from './myImages';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
let log = console.log;

const Profile = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      log("currnetuser", user);
    } else {
      log("asd");
    }

  const isUser = useSelector((state) => state);
  log("user redux", isUser);
  log("state", isUser);

  return (
    <Router>
      <div>
      <Toolbar />
      <Account/>
<Switch>
<Route path='/profile/photos' component={ImageGridList}/>
<Route path='/profile/about' component={About}/>
</Switch>
    </div>
    </Router>
  );
};

export default Profile;

