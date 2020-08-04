import React from "react";
import "./App.css";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Newsfeed from "./components/newsfeed";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/profile";
import Friends from "./components/friends";
<<<<<<< HEAD
import SignInCode from "./components/signUp&signIn/signInCode";
import { Divider } from "@material-ui/core";
=======
import Services from "./components/services";
import Petfinder from "./components/petfinder";

>>>>>>> f045ec26902a5dfd118dd5f23b45baa01f2d5d57
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/friends" component={Friends} />
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
