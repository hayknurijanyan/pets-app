import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export function ImageAvatarSmall() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        component={Link}
        to="/profile"
        alt="Albert Einstein"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRp2JhPKPKlf3S80BQXaCDuK0bsOgVgK8mc5g&usqp=CAU"
        className={classes.small}
      />
    </div>
  );
}
export default function ImageAvatar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar
        component={Link}
        to="/profile"
        alt="Albert Einstein"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRp2JhPKPKlf3S80BQXaCDuK0bsOgVgK8mc5g&usqp=CAU"
        className={classes.large}
      />
    </div>
  );
}
