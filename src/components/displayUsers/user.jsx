import React, { useEffect } from "react";
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
import { db, storage } from "../../firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  main: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 5,
    justifyContent: "flex-start",
  },
  button: {
    width: 100,
    height: 30,
  },
}));

function User(props) {
  const { result } = props;
  const classes = useStyles();

  const handleFollowClick = (obj) => {
    // console.log(obj);
    const friendName = `${obj.firstName} ${obj.lastName}`;
    const friendEmail = obj.email;
    // console.log(friendEmail);
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
      alert("enter value");
    }
  };

  return (
    <>
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
                              color="secondary"
                            >
                              {`@${obj.pet}`}
                            </Typography>
                            {obj.location.city ? ` -${obj.location.city}` : ""}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Button
                      onClick={() => handleFollowClick(obj)}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Follow
                    </Button>
                  </List>
                </Card>
              </div>
            );
          })
        : ""}
    </>
  );
}

User.propTypes = {
  result: PropTypes.array.isRequired,
};

export default User;
