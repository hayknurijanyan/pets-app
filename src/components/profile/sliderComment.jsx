import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
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
    marginLeft: 30,
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
    borderRadius: 20,
  },
  main: { display: "flex" },
  large: {},
}));
export default function SliderComment(props) {
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
              Name
            </Typography>
            ​
            <Typography className={classes.commentText} variant="body1">
              This is Comment
            </Typography>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
