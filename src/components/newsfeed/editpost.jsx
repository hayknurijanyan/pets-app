import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField, MenuItem, CardMedia } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    minWidth: 400,
    marginRight: 25,
  },
  media: {
    display: "flex",
    maxWidth: 800,
    maxWidth: 600,
  },
}));

export default function EditPost(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(props.value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    let newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <MenuItem onClick={handleClickOpen}>Edit</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle color="primary">Editing Post</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            onChange={handleChange}
            value={value}
            autoFocus
            margin="dense"
            id="name"
            fullWidth
          />

          <img
            className={classes.media}
            //   className={classes.media}
            src={props.postImg}
          />
        </DialogContent>
        <DialogActions>
          <div onClick={props.handleClose} color="primary">
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </div>
          <div onClick={props.handleClose} color="primary">
            <Button onClick={props.onEdit} color="primary">
              Save Changes
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
