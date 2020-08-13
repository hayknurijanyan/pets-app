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
import EditPopover from "./editpopup";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    height: 600,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 5,
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
  bio: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 30,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function About() {
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
              About Me
            </Typography>
          }
        />
        <CardContent>
          <div className={classes.bio}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              Bio
            </Typography>
            <Typography variant="h6">
              I am the best Physicist in the world
            </Typography>
          </div>
          <Divider />
          <div className={classes.content}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              Full Name
            </Typography>
            <Typography variant="h6">Albert Einstein</Typography>
          </div>
          <div className={classes.content}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              Profession
            </Typography>
            <Typography variant="h6">Theoretical Physicist</Typography>
          </div>
          <div className={classes.content}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              City
            </Typography>
            <Typography variant="h6">Wurttemberg</Typography>
          </div>
          <div className={classes.content}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              Country
            </Typography>
            <Typography variant="h6">German Empire</Typography>
          </div>
          <div className={classes.content}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              Gender
            </Typography>
            <Typography variant="h6">Male</Typography>
          </div>
          <div className={classes.content}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              Birthday
            </Typography>
            <Typography variant="h6">March 14, 1879</Typography>
          </div>
          <div className={classes.content}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              E-mail
            </Typography>
            <Typography variant="h6">einstein@gmail.com</Typography>
          </div>
          <div className={classes.content}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
            >
              Phone Number
            </Typography>
            <Typography variant="h6">+188 900 999 88</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
