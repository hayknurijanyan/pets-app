import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ChatButton(props) {
  const classes = useStyles();

  return (
    <div onClick={props.openChat} className={classes.root}>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
    </div>
  );
}
