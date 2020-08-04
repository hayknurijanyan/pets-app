import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import * as firebase from "firebase";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Link,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
} from "@material-ui/core";

let log = console.log;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Charo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .catch((e) => e.message);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        db.collection("users")
          .doc(data.user.uid)
          .set({
            email,
            info: { firstName, lastName },
          })
          .then(() => {
            db.collection("info")
              .doc(data.user.uid)
              .set({
                userId: db.doc(`users/${data.user.uid}`),
                info: [{ firstName, lastName }], // here we can add coleections
              });
            alert("welcome user");
          });
      })
      .catch((err) => log(err));
  };

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => alert("welcome back"))
      .catch((err) => alert(err));
  };

  return (
    <Grid container component="main" className={classes.root}>
      {log("user", user, "name", firstName, "sur", lastName, "email", email)}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <input
                  onChange={handleFirstName}
                  placeholder="firstName"
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  // fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  onChange={handleLastName}
                  variant="outlined"
                  required
                  // fullWidth
                  placeholder="lastName"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  onChange={handleEmail}
                  variant="outlined"
                  required
                  // fullWidth
                  placeholder="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  onChange={handlePassword}
                  variant="outlined"
                  required
                  // fullWidth
                  placeholder="password"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              // type="submit"
              // fullWidth
              // variant="contained"
              // color="primary"
              // className={classes.submit}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>

            <Button
              // type="submit"
              // fullWidth
              // variant="contained"
              // color="primary"
              // className={classes.submit}
              onClick={handleLogout}
            >
              logout
            </Button>
            <Button
              // type="submit"
              // // fullWidth
              // variant="contained"
              // color="primary"
              // className={classes.submit}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignUp;
