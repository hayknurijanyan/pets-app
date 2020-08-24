import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { isUserAction, userDataAction } from "../../actions";
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
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { db } from "../../firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
let log = console.log;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      "url(https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    backgroundSize: "contain",
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const isUser = useSelector((state) => state.isUser); // ստեղ արդեն ունես isUser փոփոխականը որը կարաս get անես app ի ցանկացած մասից useSelector ով
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(isUserAction(user));
        setUser(user);
      } else {
        log("redux not done");
      }
    });
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => alert("logout succsess"))
      .catch((e) => e.message);
  };

  const handleSignIn = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const fetchUserData = async () => {
          const user = firebase.auth().currentUser;
          const ref = db.collection("users").doc(user.uid);
          const collection = await ref.get();
          dispatch(userDataAction({ ...collection.data() }));
        };
        fetchUserData();
      })
      .catch((err) => {
        setError(err);
        checkError(error);
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkError = (err) => {
    return (
      <Alert onClose={handleClose} severity="error">
        {err.message}
      </Alert>
    );
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {checkError(error)}
      </Snackbar>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal" /// value // Mosh form
              required
              fullWidth
              id="email"
              label="email"
              name="em ail"
              autoComplete="email"
              autoFocus
              onChange={handleEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="pass word"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignIn;
