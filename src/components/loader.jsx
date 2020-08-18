import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
    marginTop: "25%",
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <CircularProgress disableShrink />
    </div>
  );
}
