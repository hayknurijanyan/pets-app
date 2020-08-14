import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { Avatar, IconButton, Typography, Collapse } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import EditPopover from "./editpopup";
import image from "../../images/dog.jpg";
import ImageAvatar from "../avatar";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
    textDecoration: "none",
  },
  comment: {
    margin: 20,
  },
  commentText: {
    marginLeft: 10,
  },
  addButton: {
    width: 70,
    height: 54,
    marginBottom: 3,
  },
  commentLine: {
    backgroundColor: "#fafafa",
    // borderRadius: 5,
  },
}));

export default function Comment() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.comment}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            H
          </Avatar>
        }
        action={<EditPopover />}
        title="Hayk Nurijanyan"
        subheader="August 03, 2020"
      />
      <CardContent className={classes.commentLine}>
        <Typography className={classes.commentText}>
          this is comments
        </Typography>
      </CardContent>
    </Card>
  );
}
