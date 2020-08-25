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
import { db, storage } from "../../firebase";
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
  buttonDisabled: {
    width: 120,
    height: 30,
    marginRight: 20,
    display: "none",
  },
  inline: {
    display: "flex",
    flexDirection: "column",
  },
}));

function User(props) {
  console.log(props.result);

  // const checkFollowing = () => {

  //   let found = false;
  //   for (let i = 0; i < firnds.length; i++) {
  //     if (friends[i].email == "Magenic") {
  //       found = true;
  //       break;
  //     }
  //   }
  // };

  const { result } = props;
  const classes = useStyles();
  const [btnColor, setBtnColor] = useState("info");
  const [currentFollow, setCurrentFollow] = useState("info");

  const handleFollowClick = (obj) => {
    setCurrentFollow(obj);
    // console.log(obj);
    setBtnColor("primary");
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
    } else {
      alert("user not found");
    }
  };
  const userData = useCurrentUserData();
  const s = useAllUsersData();
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
                      // disabled={obj.email === userData.email}
                      onClick={() => handleFollowClick(obj)}
                      className={
                        obj.email === userData.email
                          ? classes.buttonDisabled
                          : classes.button
                      }
                      variant="contained"

                      // color="primary"

                      // color={obj.email === currentFollow.email ? "primary" : ""}
                    >
                      Follow
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
