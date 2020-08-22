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

let log = console.log;

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
  const [edit, setEdit] = useState("false");
  const classes = { ...useStyles() };
  const bull = <span className={classes.bullet}>•</span>;
  let aboutList = null;
  let forEdit = null;
  const [userData, setUserData] = useState({});
  const [bio, setBio] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState({ city: "", country: "" });
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [userPetInfo, setUserPetInfo] = useState({
    age: "",
    behavior: "",
    breed: "",
    name: "",
    petsGender: "",
  });
  let collection;
  useEffect(() => {
    const fetchUser = async () => {
      const ref = db.collection("users").doc(auth.currentUser.uid);
      collection = await ref.get();

      const userData = collection.data();
      setUserData(userData);
      setBio(userData.bio);
      setFName(userData.firstName);
      setLName(userData.lastName);
      setProfession(userData.profession);
      setLocation({ ...userData.location });
      setGender(userData.maleFemale);
      setAge(userData.age);
      setEmail(userData.email);
      setNumber(userData.contactNumber);
      setUserPetInfo(userData.userPetInfo);
    };
    fetchUser();
  }, []);
  function editHandler() {
    setEdit(!edit);
  }
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
      } else if (e.target.name === "pName") {
        setUserPetInfo({
          age: userPetInfo.age,
          breed: userPetInfo.breed,
          behavior: userPetInfo.behavior,
          petsGender: userPetInfo.petsGender,
          name: e.target.value,
        });
      } else if (e.target.name === "pAge") {
        setUserPetInfo({
          age: e.target.value,
          breed: userPetInfo.breed,
          behavior: userPetInfo.behavior,
          petsGender: userPetInfo.petsGender,
          name: userPetInfo.name,
        });
      } else if (e.target.name === "pBehavior") {
        setUserPetInfo({
          age: userPetInfo.age,
          breed: userPetInfo.breed,
          behavior: e.target.value,
          petsGender: userPetInfo.petsGender,
          name: userPetInfo.name,
        });
      } else if (e.target.name === "pGender") {
        setUserPetInfo({
          age: userPetInfo.name,
          breed: userPetInfo.breed,
          behavior: userPetInfo.behavior,
          petsGender: e.target.value,
          name: userPetInfo.name,
        });
      } else if (e.target.name === "pBreed") {
        setUserPetInfo({
          age: userPetInfo.age,
          breed: e.target.value,
          behavior: userPetInfo.behavior,
          petsGender: userPetInfo.petsGender,
          name: userPetInfo.name,
        });
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
      userPetInfo,
    } = userData;
    log("this is data", userData);
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
      userPetInfo,
    };

    if (Object.keys(userData).length) {
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
            <Typography className={classes.title} color="primary" variant="h5">
              About pet
            </Typography>
            <Divider />
            <CardContent>
              <div className={classes.content}>
                <Typography
                  className={classes.text}
                  variant="h6"
                  color="textSecondary"
                >
                  Age
                </Typography>
                <Typography variant="h6">{userPetInfo.age}</Typography>
              </div>{" "}
              <div className={classes.content}>
                <Typography
                  className={classes.text}
                  variant="h6"
                  color="textSecondary"
                >
                  Behavior
                </Typography>
                <Typography variant="h6">{userPetInfo.behavior}</Typography>
              </div>{" "}
              <div className={classes.content}>
                <Typography
                  className={classes.text}
                  variant="h6"
                  color="textSecondary"
                >
                  Breed
                </Typography>
                <Typography variant="h6">{userPetInfo.breed}</Typography>
              </div>{" "}
              <div className={classes.content}>
                <Typography
                  className={classes.text}
                  variant="h6"
                  color="textSecondary"
                >
                  Pets name
                </Typography>
                <Typography variant="h6">{userPetInfo.name}</Typography>
              </div>{" "}
              <div className={classes.content}>
                <Typography
                  className={classes.text}
                  variant="h6"
                  color="textSecondary"
                >
                  Pets gender
                </Typography>
                <Typography variant="h6">{userPetInfo.petsGender}</Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
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
      userPetInfo,
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
      userPetInfo,
    };

    aboutList = (
      <EditTabPanel
        data={forEdit}
        handlerBack={editHandler}
        handlerInput={(e) => handlerInput(e)}
        handlerSubmit={handlerSubmit}
      />
    );
  }

  return userData !== null ? (
    <div className={classes.bio}>{aboutList}</div>
  ) : (
    <div className={classes.loader}>
      <Loader />
    </div>
  );
}
