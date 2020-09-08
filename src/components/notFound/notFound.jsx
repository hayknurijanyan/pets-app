import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Grid, CssBaseline, TextField, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import usePictureFromStorage from "../customHooks/usePictureFromStorage";
let log = console.log;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NotFount() {
  const picUrl = usePictureFromStorage("notFound", "dog_not_found");

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: `url(${picUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
      backgroundSize: "contain",
      backgroundPosition: "cover",
      zIndex: "10000",
      height: "100%",
      width: "100%",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    div: {
      display: "flex",
      justifyContent: "center",
    },
  }));
  const classes = useStyles();

  console.log(picUrl);

  return (
    <div className={classes.div}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {/* <div className={classes.paper}></div> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFount;
