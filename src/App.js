import React from "react";
import "./App.css";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Newsfeed from "./components/newsfeed";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/profile";
import Friends from "./components/friends";
import PetsSelectFiled from "./components/petsSecelctFiled";

import { Divider } from "@material-ui/core";

import Services from "./components/services";
import Petfinder from "./components/petfinder";
import Main from "./components/petfinder";

function App() {
  return (
    <Router>
      <div>
        {/* <Profile /> */}
        <Switch>
          <Route path="/" exact component={SignIn} />
          {/* <Route path="/friends" component={Friends} /> */}
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/newsfeed" component={Newsfeed} />
          <Route path="/profile" component={Profile} />
          <Route path="/services" component={Services} />
          <Route path="/petfinder" component={Petfinder} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
