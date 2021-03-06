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
import { db, auth } from "../../firebase";
import Loader from "../loader";
import EditTabPanel from "./editTabPanel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import logger from "redux-logger";
import uniqid from "uniqid";

let log = console.log;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(true);
  const classes = { ...useStyles() };
  const [userData, setUserData] = useState({});
  const [bio, setBio] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [userPetInfo, setUserPetInfo] = useState({
    age: "age",
    behavior: "asd",
    breed: "asd",
    name: "asd",
    petsGender: "asd",
  });

  let aboutList = null;
  let forEdit = null;

  useEffect(() => {
    async function fetchMyData() {
      const ref = db.collection("users").doc(auth.currentUser.uid);
      const collection = await ref.get();
      const data = collection.data();

      setBio(data.bio);
      setFName(data.firstName);
      setLName(data.lastName);
      setProfession(data.profession);
      setLocation({
        city: data.location.city,
        country: data.location.country,
      });
      setGender(data.maleFemale);
      setAge(data.age);
      setEmail(data.email);
      setNumber(data.contactNumber);
      setUserPetInfo({ ...data.userPetInfo });
    }
    fetchMyData().catch((error) => {
      logger.log(error);
    });
  }, []);
  function editHandler() {
    setEdit(!edit);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkError = (err) => {
    return (
      <Alert onClose={handleClose} severity="success">
        {err.message}
      </Alert>
    );
  };
  function handlerSubmit() {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        bio,
        firstName: fName,
        lastName: lName,
        profession,
        location: { ...location },
        maleFemale: gender,
        age,
        email,
        contactNumber: number,
        userPetInfo: { ...userPetInfo },
      })
      .then(() => {
        setError({ message: "Changes saved" });
        checkError(error);
        setOpen(true);
      })
      .then(() => {
        const fetchUser = async () => {
          const ref = db.collection("users").doc(auth.currentUser.uid);
          let collection = await ref.get();
          setUserData({ ...collection.data() });
        };
        fetchUser();
      })
      .catch((err) => {
        log(err);
        logger.log(error);
      });
  }

  function handlerInput(e) {
    switch (e.target.name) {
      case "bio":
        setBio(e.target.value);
        break;
      case "age":
        setAge(e.target.value);
        break;
      case "fName":
        setFName(e.target.value);
        break;
      case "lName":
        setLName(e.target.value);
        break;
      case "profession":
        setProfession(e.target.value);
        break;
      case "gender":
        setGender(e.target.value);
        break;
      case "city":
        setLocation({ city: e.target.value, country: location.country });
        break;
      case "country":
        setLocation({ city: location.city, country: e.target.value });
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      case "petsName":
        setUserPetInfo({
          name: e.target.value,
          age: userPetInfo.age,
          breed: userPetInfo.breed,
          behavior: userPetInfo.behavior,
          petsGender: userPetInfo.petsGender,
        });
        break;
      case "petsAge":
        setUserPetInfo({
          name: userPetInfo.name,
          age: e.target.value,
          breed: userPetInfo.breed,
          behavior: userPetInfo.behavior,
          petsGender: userPetInfo.petsGender,
        });
        break;
      case "petsGender":
        setUserPetInfo({
          name: userPetInfo.name,
          age: userPetInfo.age,
          breed: userPetInfo.breed,
          behavior: userPetInfo.behavior,
          petsGender: e.target.value,
        });
        break;
      case "petsBreed":
        setUserPetInfo({
          name: userPetInfo.name,
          age: userPetInfo.age,
          breed: e.target.value,
          behavior: userPetInfo.behavior,
          petsGender: userPetInfo.petsGender,
        });
        break;
      case "petsBehavior":
        setUserPetInfo({
          name: userPetInfo.name,
          age: userPetInfo.age,
          breed: userPetInfo.breed,
          behavior: e.target.value,
          petsGender: userPetInfo.petsGender,
        });
        break;
    }
  }

  if (edit) {
    const userArr = [
      {
        title: "Bio",
        value: bio,
      },
      {
        title: "First Name",
        value: fName,
      },
      {
        title: "Last Name",
        value: lName,
      },
      {
        title: "Profession",
        value: profession,
      },
      {
        title: "City",
        value: location.city,
      },
      {
        title: "Country",
        value: location.country,
      },
      {
        title: "Gender",
        value: gender,
      },
      {
        title: "Age",
        value: age,
      },
      {
        title: "Email",
        value: email,
      },
      {
        title: "Phone number",
        value: number,
      },
    ];
    const petArr = [
      { title: "Age", value: userPetInfo.age },
      { title: "Behavior", value: userPetInfo.behavior },
      { title: "Breed", value: userPetInfo.breed },
      { title: "Name", value: userPetInfo.name },
      { title: "Gender", value: userPetInfo.petsGender },
    ];
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
          <Divider />
          <CardContent>
            {userArr.map((title) => (
              <div key={uniqid()} className={classes.bio}>
                <Typography
                  className={classes.text}
                  variant="body1"
                  color="textSecondary"
                >
                  {title.title}
                </Typography>
                <Typography variant="h6">{title.value}</Typography>
              </div>
            ))}
          </CardContent>
          <Typography className={classes.title} color="primary" variant="h5">
            Pet Info
          </Typography>
          <Divider />
          <CardContent>
            {petArr.map((title) => (
              <div key={uniqid()} className={classes.bio}>
                <Typography
                  className={classes.text}
                  variant="body1"
                  color="textSecondary"
                >
                  {title.title}
                </Typography>
                <Typography variant="h6">{title.value}</Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  } else {
    forEdit = {
      age,
      bio,
      fName,
      lName,
      gender,
      email,
      profession,
      location: { ...location },
      number,
      userPetInfo: { ...userPetInfo },
    };
    aboutList = (
      <EditTabPanel
        data={{ ...forEdit }}
        handlerBack={editHandler}
        handlerInput={(e) => handlerInput(e)}
        handlerSubmit={handlerSubmit}
      />
    );
  }

  return userData !== null ? (
    <div className={classes.bio}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {checkError(error)}
      </Snackbar>
      {aboutList}
    </div>
  ) : (
    <div className={classes.loader}>
      <Loader />
    </div>
  );
}
