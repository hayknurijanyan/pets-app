import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../firebase";
import * as firebase from "firebase";
import PetsSelectFiled from "./petsSelectField";
import { useDispatch, useSelector } from "react-redux";
import { isUserAction, userDataAction } from "../../actions";
import SetDefaultPictureUrl from "./setDefaultPictureUrl";
import { MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";
// import Upload from "../upLoadingFiles/upLoad";
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
  Divider,
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
  const [breed, setBreed] = useState("");
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState(0);
  const [petGender, setPetGender] = useState("");
  const [age, setAge] = useState(0);
  const [bio, setBio] = useState("");
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({
    country: "",
    city: "",
  });

  const [contactNumber, setContactNumber] = useState("");
  const [maleFemale, setMaleFemale] = useState("");
  const [profession, setProfession] = useState("");
  const [avatar, setAvata] = useState("");
  const [photos, setPhotos] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState("");
  const [defaultPetUrl, setDefaultPetUrl] = useState("");
  const [petInfo, setPetInfo] = useState({
    name: "",
    petsGender: "",
    breed: "",
    age: 0,
    behavior: "",
  });
  const isUser = useSelector((state) => state.isUser); // ստեղ արդեն ունես isUser փոփոխականը որը կարաս get անես app ի ցանկացած մասից useSelector ով
  const dispatch = useDispatch();

  // create in user  collection an array
  // setMyState({
  //   ...myState,
  //   propB: false
  // });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(isUserAction(user));
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
            defaultPetUrl,
            userPetInfo: {
              name: petName,
              petsGender: petGender,
              breed: breed,
              age: petAge,
              behavior: "",
            },
            friends: [],
          })
          .then(() => {
            db.collection("petsFinder")
              .doc("petsID")
              .update({
                allPetsSearch: firebase.firestore.FieldValue.arrayUnion({
                  owner: { firstName, lastName },
                  pet,
                  defaultPetUrl,
                  petInfo,
                  userId: data.user.uid,
                }),
              })
              .catch((err) => log(err));
          });
        const fetchUserData = async () => {
          const user = firebase.auth().currentUser;
          const ref = db.collection("users").doc(user.uid);
          const collection = await ref.get();
          dispatch(userDataAction({ ...collection.data() }));
        };
        fetchUserData();
      })
      .catch((err) => log(err));
  };

  return (
    <Grid container component="main" className={classes.root}>
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
                  placeholder="First Name"
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  isRequired="true"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleLastName}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Last Name"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
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
              <Divider />
              <Grid item xs={12}>
                <PetsSelectFiled
                  onHandlePetSet={setPet}
                  onHandleBreedSet={setBreed}
                  onHandlePetName={setPetName}
                  onHandlePetAge={setPetAge}
                  onHandlePetGender={setPetGender}
                  pet={pet}
                  breed={breed}
                  petName={petName}
                  petAge={petAge}
                  petGender={petGender}
                />
                <SetDefaultPictureUrl
                  onHandlePetUrlSet={setDefaultPetUrl}
                  pet={pet}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive promotions and updates via email."
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
