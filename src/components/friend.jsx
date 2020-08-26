import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedAction } from "../actions";
import { store } from "../index";
import SidebarLeft from "./sidebarleft.jsx";
import SidebarRight from "./sidebarright.jsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Toolbar,
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
  CardContent,
} from "@material-ui/core";
import Pet from "./pet.jsx";
import useCurrentUserData from "./customHooks/useCurrentUserData.jsx";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 180,
  },

  main: {
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap",
    marginTop: 20,
    width: "20 rem",
    maxHeight: 150,
    marginLeft: 50,
    justifyContent: "flex-start",
  },
  button: {
    width: 100,
    height: 30,
  },
  buttonArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "2 rem",
  },
}));

function Friend(props) {
  const classes = useStyles();

  return (
    <Card className={classes.main}>
      <CardContent>
        <List className={classes.container}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://www.zone4homes.com/themes/fo/img/avatar.png"
              />
            </ListItemAvatar>
            <ListItemText
              primary={props.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="secondary"
                  ></Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </CardContent>
      <CardContent className={classes.buttonArea}>
        <Button
          onClick={props.onUnfollow}
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Unfollow
        </Button>
      </CardContent>
    </Card>
  );
}

export default Friend;
