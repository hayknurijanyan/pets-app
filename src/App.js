import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Signin from "./components/signin";
import Footer from "./components/footer";
import Signup from "./components/signup";
import Feed from "./components/feed";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/profile";
import friends from "./components/friends";
import Friends from "./components/friends";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={(Signin, Footer)} />
          <Route path="/friends" component={Friends} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/feed" component={Feed} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
