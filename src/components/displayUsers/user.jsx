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
import { useDispatch, useSelector } from "react-redux";
import { userFriendsAction } from "../../actions";

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
    width: 350,
  },

  main: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 5,
    justifyContent: "flex-start",
    minWidth: 350,
    minHeight: 140,
  },
  button: {
    width: 130,
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
  const { result, emailArray, userData, setEmailArray } = props;
  const classes = useStyles();
  const [btnColor, setBtnColor] = useState("info");
  const [asd, setAsd] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {}, [asd]);

  const handleFollowClick = (obj) => {
    const friendName = `${obj.firstName} ${obj.lastName}`;
    const friendEmail = obj.email;
    const friendAvatar = obj.avatar;
    const friendUid = obj.userId.id;

    const user = firebase.auth().currentUser;
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion({
            name: friendName,
            email: friendEmail,
            avatar: friendAvatar,
            uid: friendUid,
          }),
        })
        .then(async () => {
          const ref = db.collection("users").doc(user.uid);
          const collection = await ref.get();
          dispatch(userFriendsAction(collection.data().friends));
          const newArray = [...collection.data().friends];
          const result = [];
          newArray.forEach((obj) => {
            result.push(obj.email);
          });
          setAsd(result);
        });
    }
  };

  log(asd, "asd");

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
                        emailArray.includes(obj.email) ||
                        asd.includes(obj.email)
                          ? "primary"
                          : "info"
                      }
                    >
                      {emailArray.includes(obj.email) || asd.includes(obj.email)
                        ? "Following"
                        : "Follow"}
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
