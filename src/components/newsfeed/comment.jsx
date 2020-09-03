import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
import EditComment from "./editcomment";
import ImageAvatar from "../profile/avatar";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    alignItems: "center",
    marginRight: 2,
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
    borderRadius: 30,
  },
  main: { display: "flex" },
  large: {
    // width: theme.spacing(7),
    // height: theme.spacing(7),
  },
}));

export default function Comment(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={classes.comment}>
        <div className={classes.avatar}>
          <Avatar
            component={Link}
            to="/profile"
            // alt="Albert Einstein"
            src={props.userAvatar}
            className={classes.large}
          />
        </div>
        <div>
          <CardContent className={classes.commentLine}>
            <Typography
              className={classes.name}
              color="TextSecondary"
              variant="body2"
            >
              {props.name}
            </Typography>

            <Typography className={classes.commentText} variant="body1">
              {props.content}
            </Typography>
          </CardContent>
        </div>
        <div>
          <EditComment onCommentDelete={props.onCommentDelete} />
        </div>
      </div>
    </div>
  );
}
