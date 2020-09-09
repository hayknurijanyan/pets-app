import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Image from "../images/dog_not_found.jpg";
import Image2 from "../images/notfound2.jpg";
import { ListItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    // marginTop: 64,
    position: "absolute",
    zIndex: "1300",
    overflow: "visible",
    width: "100%",
    height: "100%",
  },
  button: {
    marginTop: "-13%",
    marginLeft: "66%",
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <img src={Image2} width="100%" height="100%" />
        <Button
          button
          component={Link}
          to="newsfeed"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Back to Website
        </Button>
      </div>
    </React.Fragment>
  );
}
