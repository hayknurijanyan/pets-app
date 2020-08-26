import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import uniqid from "uniqid";
import PropTypes from "prop-types";
import {
  Card,
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
} from "@material-ui/core";
import useCurrentUserData from "../customHooks/useCurrentUserData";
import useAllUsersData from "../customHooks/useAllUsersData";
import { db, auth } from "../../firebase";
import firebase from "firebase";
let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  main: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 5,
    justifyContent: "flex-start",
    minWidth: 400,
    minHeight: 140,
  },
  button: {
    width: 120,
    height: 30,
    marginRight: 20,
  },
  buttonDisplayNone: {
    display: "none",
    width: 120,
    height: 30,
    marginRight: 20,
  },
  inline: {
    display: "flex",
    flexDirection: "column",
  },
}));

function User(props) {
  const { result } = props;
  const classes = useStyles();
  const [btnColor, setBtnColor] = useState("info");
  const [emailArray, setEmailArray] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const ref = db.collection("users").doc(auth.currentUser.uid);
    let collection = ref
      .get()
      .then((doc) => {
        const newArray = [...doc.data().friends];
        setUserData({ ...doc.data() });
        const result = [];
        newArray.forEach((obj) => {
          result.push(obj.email);
        });
        setEmailArray(result);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleFollowClick = (obj) => {
    const friendName = `${obj.firstName} ${obj.lastName}`;
    const friendEmail = obj.email;

    const user = firebase.auth().currentUser;
    if (user) {
      db.collection("users")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection("users")
              .doc(doc.id)
              .update({
                friends: firebase.firestore.FieldValue.arrayUnion({
                  name: friendName,
                  email: friendEmail,
                }),
              });
          });
        });
      const fetchData = async () => {
        try {
          const ref = db.collection("users").doc(user.uid);
          const collection = await ref.get();
          const newArray = [...collection.data().friends];
          const result = [];
          newArray.forEach((obj) => {
            result.push(obj.email);
          });
          setEmailArray(result);
        } catch {
          log("something went wrong");
        }
      };
      fetchData();
    }
  };

  return (
    <div className={classes.root}>
      {result.length
        ? result.map((obj) => {
            return (
              <div key={uniqid()}>
                <Card className={classes.main}>
                  <List className={classes.container}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            obj.avatar ||
                            "https://www.zone4homes.com/themes/fo/img/avatar.png"
                          }
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={` ${obj.firstName} ${obj.lastName}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textSecondary"
                            >
                              {obj.location.city
                                ? `  ${obj.location.city}`
                                : ""}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="secondary"
                            >
                              {`@${obj.pet}`}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Button
                      onClick={() => handleFollowClick(obj)}
                      className={
                        obj.email !== userData.email
                          ? classes.button
                          : classes.buttonDisplayNone
                      }
                      variant="contained"
                      color={
                        emailArray.includes(obj.email) ? "primary" : "info"
                      }
                      // disabled={emailArray.includes(obj.email)}
                    >
                      {emailArray.includes(obj.email) ? "Following" : "Follow"}
                    </Button>
                  </List>
                </Card>
              </div>
            );
          })
        : ""}
    </div>
  );
}

User.propTypes = {
  result: PropTypes.array.isRequired,
};

export default User;
