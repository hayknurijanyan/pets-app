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
import Pet from "../pet";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 5,
    width: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  text: {
    marginRight: 20,
  },
  title: {
    marginLeft: 30,
  },
});

export default function PetsCard() {
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
              Pets
            </Typography>
          }
        />
        <CardContent>
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
          <Pet />
        </CardContent>
      </Card>
    </div>
  );
}
