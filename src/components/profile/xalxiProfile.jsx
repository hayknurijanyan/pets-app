import React from "react";
import { Toolbar, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Account from "./account";
import About from "./about";
import { useSelector } from "react-redux";
import firebase from "firebase";
import ImageGridList from "./myImages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Friends from "../friends";
import AllPets from "../allpets";
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
const XalxiProfile = (props) => {
  const classes = useStyles();
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
  let data = null;
  useEffect(() => {
    async function fetchMyData() {
      const ref = db.collection("users").doc(props.userId);
      const collection = await ref.get();
      data = collection.data();

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
    fetchMyData();
  }, []);

  return <div>{(fName, lName, age, gender, profession, number, email)}</div>;
};

export default XalxiProfile;
