import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import Post from "./post";

const useStyles = makeStyles((theme) => ({
  content: {
    justifyContent: "center",
    padding: theme.spacing(3),
    width: "40rem",
  },
}));

const Posts = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Toolbar />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
