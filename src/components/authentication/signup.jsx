import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../firebase";
import * as firebase from "firebase";
import PetsSelectFiled from "./petsSecelctFiled";
import { useDispatch, useSelector } from "react-redux";
import { isUserAction } from "../../actions";

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
  const [pet, setPet] = useState("");
  const [age, setAge] = useState(0);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState({
    country: "",
    city: "",
  });
  const [contactNumber, setContactNumber] = useState("");
  const [maleFemale, setMaleFemale] = useState("");
  const [profession, setProfession] = useState("");
  const [avatar, setAvata] = useState("");
  const [photos, setPhotos] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  // create in user  collection an array
  // setMyState({
  //   ...myState,
  //   propB: false
  // });

  const [petInfo, setPetInfo] = useState({
    name: "",
    petsGender: "",
    breed: "",
    url:
      "https://images.photowall.com/products/57205/golden-retriever.jpg?h=699&q=85",
    age: 0,
    behavior: "",
  });

  const isUser = useSelector((state) => state.isUser); // ստեղ արդեն ունես isUser փոփոխականը որը կարաս get անես app ի ցանկացած մասից useSelector ով
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(isUserAction());
      } else {
        log("redux state.isUser is false");
      }
    });
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      // .then(() => alert("logout succsess"))
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
            userId: db.doc(`users/${data.user.uid}`),
            currentUserInfo: {
              email,
              avatar,
              photos,
              coverPhoto,
              email,
              firstName,
              lastName,
              age,
              bio,
              location,
              maleFemale,
              profession,
              contactNumber,
              pet,
              userPetInfo: petInfo,
            },
          })
          // .then(() => {
          //   db.collection("usersPet")
          //     .doc(data.user.uid)
          //     .set({
          //       userId: db.doc(`users/${data.user.uid}`),
          //       userPetInfo: petInfo,
          //     })
          //     .catch((err) => log(err));
          // });
          .then(() => {
            db.collection("petsFinder")
              .doc("9EjERLCKRVowoWKnC1j5")
              .update({
                allPetsSearch: firebase.firestore.FieldValue.arrayUnion({
                  owner: { firstName, lastName },
                  pet,
                  petInfo,
                  userId: data.user.uid,
                }),
              })
              .catch((err) => log(err));
          });
        alert("welcome user");
      })
      .catch((err) => log(err));
  };

  return (
    <Grid container component="main" className={classes.root}>
      {/* {log("user", user, "name", firstName, "sur", lastName, "email", email)} */}
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
                <TextField
                  onChange={handleFirstName}
                  placeholder="firstName"
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="firstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleLastName}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="lastName"
                  id="lastName"
                  label="lastname"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <PetsSelectFiled onHandlePetSet={setPet} pet={pet} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleEmail}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="email"
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handlePassword}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="password"
                  name="password"
                  label="password"
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
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleSignUp()}
            >
              Sign Up
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleLogout()}
            >
              Logout
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
