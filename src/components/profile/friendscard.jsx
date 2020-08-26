import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  CardActions,
  CardHeader,
  Card,
  Divider,
} from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import ImageAvatar from "./avatar";
import EditPopover from "../newsfeed/editpopup";
import Friend from "../friend";
import Friends from "../friends";
import XalxiProfile from "./xalxiProfile/xalxiProfile";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    height: 600,
    width: 720,
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: 35,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginLeft: 30,
  },
});

export default function FriendsCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          action={
            <CardActions>
              <Button size="small" variant="outlined" color="primary">
                Edit
              </Button>
            </CardActions>
          }
          title={
            <Typography className={classes.title} color="primary" variant="h5">
              Friends
            </Typography>
          }
        />
        <CardContent>
          <Friends />
        </CardContent>
      </Card>
    </div>
  );
}
