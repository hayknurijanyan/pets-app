import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

function PhotoSlider(props) {
  const [index, setIndex] = useState(props.index);
  const [open, setOpen] = useState(true);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     index: this.props.index,
  //     open: true,
  //   };
  // }

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  function handleClose() {
    setOpen({ open: false });
    props.backClickHandler();
  }
  function handleNext() {
    if (index < props.images.length - 1) {
      setIndex(index + 1);
    }
  }
  function handlePrev() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  const useStyles = makeStyles((theme) => ({
    img: {
      maxWidth: "100%",
      maxHeight: "auto",
      objectFit: "contain",
    },
    imgDiv: {
      maxWidth: "70%",
      height: "100%",
    },
    divStyle: {
      width: "100%",
      // height: "400px",
    },
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    btn: {
      color: "secondary",
      height: "100%",
    },
  }));
  const classes = useStyles();
  return (
    <Dialog
      // fullWidth={"1000px"}
      // maxWidth={"1000px"}
      className={classes.divStyle}
      open={true}
      onClose={handleClose}
    >
      <DialogTitle id="max-width-dialog-title">Your Photos</DialogTitle>
      <DialogContent className={classes.content}>
        <Button color="primary" onClick={handlePrev} className={classes.btn}>
          prev
        </Button>
        <div className={classes.imgDiv}>
          <img src={props.images[index].img} className={classes.img}></img>
        </div>
        <Button color="primary" onClick={handleNext}>
          Next
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button
          onClick={() => props.onDelete(props.images[index].img)}
          color="secondary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PhotoSlider;
