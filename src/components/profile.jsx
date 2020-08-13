import React from "react";
import { Toolbar, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Account from "./account";
import About from "./about";
import { useSelector } from "react-redux";
import firebase from "firebase";
import ImageGridList from "./myImages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Friends from "./friends";
import AllPets from "./allpets";
import FriendsCard from "./friendscard";
import PetsCard from "./petscard";
let log = console.log;
const useStyles = makeStyles((theme) => ({
  card: {
    margin: 10,
    width: "45 rem",
    display: "none",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
}));
const Profile = () => {
  const classes = useStyles();
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
        <Account />
        <Card className={classes.card}></Card>
        <Switch>
          <Route path="/profile/photos" component={ImageGridList} />
          <Route path="/profile/about" component={About} />
          <Route path="/profile/friends" component={FriendsCard} />
          <Route path="/profile/pets" component={PetsCard} />
          <Route path="/profile/" component={About} />
        </Switch>
      </div>
    </Router>
  );
};

export default Profile;
