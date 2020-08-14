import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Post from "./post";

const useStyles = makeStyles((theme) => ({
  content: {
    justifyContent: "center",
    padding: theme.spacing(3),
    width: "40rem",
  },
}));

const Posts = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Post
        id={props.id}
        onDelete={props.onDelete}
        likeCount={props.likeCount}
        text={props.value}
        commentCount={props.commentCount}
        name={props.name}
        isliked={props.isliked}
        color={props.color}
      />
    </div>
  );
};

export default Posts;
