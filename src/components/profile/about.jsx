import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  CardActions,
  CardHeader,
  Card,
  Divider,
} from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import ImageAvatar from "./avatar";
import EditPopover from "../newsfeed/editpopup";
import AboutEdit from "./aboutEdit";
import firebase from "firebase";
import { db, auth } from "../../firebase";
import { compose } from "redux";
import Loader from "../loader";
let log = console.log;
//some comments to see

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 30,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 5,
    marginBottom: 30,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  text: {
    marginRight: 20,
  },
  title: {
    marginLeft: 30,
  },
  bio: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 30,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function About() {
  useEffect(() => {
    const fetchUser = async () => {
      const ref = db.collection("users").doc(auth.currentUser.uid);
      let collection = await ref.get();
      setUserData({ ...collection.data() });
    };
    fetchUser();
  }, []);
  const [edit, setEdit] = useState("false");
  const classes = { ...useStyles() };
  const bull = <span className={classes.bullet}>•</span>;
  let aboutList = null;
  let forEdit = null;
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState(null);
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [profession, setProfession] = useState(null);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);

  function editHandler() {
    setEdit(!edit);
  }
  function handlerSubmit() {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        bio,
        age,
        email,
        firsName: fName,
        lastName: lName,
        profession,
        location,
        maleFemale: gender,
        age,
        email,
        contactNumber: number,
      })
      .then(() => {
        const fetchUser = async () => {
          const ref = db.collection("users").doc(auth.currentUser.uid);
          let collection = await ref.get();
          setUserData({ ...collection.data() });
        };
        fetchUser();
      })

      .catch((err) => log(err));
  }
  function handlerInput(e) {
    if (userData !== null) {
      if (e.target.name === "bio") {
        setBio(e.target.value);
      } else if (e.target.name === "fName") {
        setFName(e.target.value);
      } else if (e.target.name === "lName") {
        setLName(e.target.value);
      } else if (e.target.name === "profession") {
        setProfession(e.target.value);
      } else if (e.target.name === "city") {
        setLocation({ city: e.target.value, country: location.country });
      } else if (e.target.name === "country") {
        setLocation({ city: location.city, country: e.target.value });
      } else if (e.target.name === "gender") {
        setGender(e.target.value);
      } else if (e.target.name === "age") {
        setAge(e.target.value);
      } else if (e.target.name === "email") {
        setEmail(e.target.value);
      } else if (e.target.name === "number") {
        setNumber(e.target.value);
      }
    }
  }
  if (edit && userData !== null) {
    const {
      bio,
      firstName,
      lastName,
      profession,
      location,
      maleFemale,
      age,
      email,
      contactNumber,
    } = userData;
    forEdit = {
      bio,
      firstName,
      lastName,
      profession,
      location,
      maleFemale,
      age,
      email,
      contactNumber,
    };

    aboutList = (
      <div>
        <Card className={classes.root}>
          <CardHeader
            action={
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={editHandler}
                >
                  Edit
                </Button>
              </CardActions>
            }
            title={
              <Typography
                className={classes.title}
                color="primary"
                variant="h5"
              >
                About Me
              </Typography>
            }
          />
          <CardContent>
            <div className={classes.bio}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                Bio
              </Typography>
              <Typography variant="h6">{bio}</Typography>
            </div>
            <Divider />
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                First Name
              </Typography>
              <Typography variant="h6">{firstName}</Typography>
            </div>
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                Last Name
              </Typography>
              <Typography variant="h6">{lastName}</Typography>
            </div>
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                Profession
              </Typography>
              <Typography variant="h6">{profession}</Typography>
            </div>
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                City
              </Typography>
              <Typography variant="h6">{location.city}</Typography>
            </div>
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                Country
              </Typography>
              <Typography variant="h6">{location.country}</Typography>
            </div>
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                Gender
              </Typography>
              <Typography variant="h6">{maleFemale}</Typography>
            </div>
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                Age
              </Typography>
              <Typography variant="h6">{age}</Typography>
            </div>
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                E-mail
              </Typography>
              <Typography variant="h6">{email}</Typography>
            </div>
            <div className={classes.content}>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
              >
                Phone Number
              </Typography>
              <Typography variant="h6">{contactNumber}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else if (userData !== null) {
    const {
      bio,
      firstName,
      lastName,
      profession,
      location,
      maleFemale,
      age,
      email,
      contactNumber,
    } = userData;
    forEdit = {
      bio,
      firstName,
      lastName,
      profession,
      location,
      maleFemale,
      age,
      email,
      contactNumber,
    };
    aboutList = (
      <AboutEdit
        handleClick={editHandler}
        data={forEdit}
        handlerInput={(e) => handlerInput(e)}
        handlerSubmit={handlerSubmit}
      />
    );
  }

  return userData !== null ? (
    aboutList
  ) : (
    <div className={classes.loader}>
      <Loader />
    </div>
  );
}
