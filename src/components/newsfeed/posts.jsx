import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Post from "./post";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
}));

const Posts = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Post
        id={props.id}
        onDelete={props.onDelete}
        value={props.value}
        onEdit={props.onEdit}
        likeCount={props.likeCount}
        text={props.value}
        commentCount={props.commentCount}
        name={props.name}
        isliked={props.isliked}
        date={props.date}
        color={props.color}
        onDelete={props.onDelete}
        postImage={props.postImage}
      />
    </div>
  );
};

export default Posts;
