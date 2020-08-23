import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
import EditComment from "./editcomment";
import ImageAvatar from "../profile/avatar";

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    borderRadius: 50,
    minHeight: 40,
    overflow: "wrap",
  },
  name: { marginLeft: 2, marginBottom: 5 },
  avatar: {
    display: "flex",
  },
  commentText: {
    display: "flex",

    overflowWrap: "anywhere",
  },
  addButton: {
    width: 70,
    height: 54,
    marginBottom: 3,
  },
  commentLine: {
    backgroundColor: "#fafafa",
    borderRadius: 50,
  },
  main: { display: "flex" },
}));

export default function Comment(props) {
  let text = "hello I want to buy this dog, how much is it?";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={classes.comment}>
        <div className={classes.avatar}>
          <ImageAvatar />
        </div>
        <div>
          <CardContent className={classes.commentLine}>
            <Typography
              className={classes.name}
              color="TextSecondary"
              variant="body2"
            >
              Hayk Nurijanyan
            </Typography>

            <Typography className={classes.commentText} variant="body1">
              {props.content}
            </Typography>
          </CardContent>
        </div>
        <div>
          <EditComment />
        </div>
      </div>
    </div>
  );
}
