import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Feed from "./components/feed";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/profile";
import Friends from "./components/friends";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={(SignIn)} />
          <Route path="/friends" component={Friends} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/feed" component={Feed} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
