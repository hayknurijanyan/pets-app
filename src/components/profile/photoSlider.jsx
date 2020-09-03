import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  Typography,
  IconButton,
  CardContent,
  TextField,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SliderComment from "./sliderComment";
import { ImageAvatarSmall } from "./avatar";
import { db } from "../../firebase";
import LikeRow from "./likeRow";
import { auth } from "firebase";

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: "100%",
    maxHeight: "70%",
    objectFit: "contain",
  },
  imgDiv: {
    maxWidth: "70%",
    maxHeight: "70%",
  },
  divStyle: {
    width: "100%",
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
  media: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 80,
    marginTop: 0,
  },
  icons: {},
  comments: {
    display: "flex",
    marginLeft: 300,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -48,
  },
  commentInput: {
    display: "flex",
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
  },
  addButton: {
    width: 70,
    height: 54,
    marginBottom: 3,
  },
  commentArea: {
    display: "flex",
    flexDirection: "column",
  },
  likesComponent: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  likesComponentDiv: {
    width: "500px",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  likesContent: {
    marginTop: "15px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likesHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: "20px",
    paddingLeft: "20px",
  },
}));

function PhotoSlider(props) {
  const [index, setIndex] = useState(props.index);
  const [open, setOpen] = useState(true);
  const [likesComponent, setLikesComponent] = useState(false);
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      const userRef = db.collection("users").doc(auth().currentUser.uid);
      const data = await userRef.get();
      setImages(data.data().photos);
    };
    fetchData();
  }, [props]);

  function likesComponentOpen() {
    setLikesComponent(!likesComponent);
  }
  function handleClose() {
    setOpen({ open: false });
    props.backClickHandler();
  }
  function setLike() {
    // db.collection("users")
    //   .doc(auth().currentUser.uid)
    //   .update({
    //     photos: [...newImages],
    //   });
  }

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Dialog
        open={likesComponent}
        onClose={likesComponentOpen}
        className={classes.likesComponent}
      >
        <div className={classes.likesComponentDiv}>
          <div className={classes.likesHeader}>
            <span>
              <FavoriteIcon color="secondary" />
            </span>
            <span>
              {`${props.images[props.index].likes.length}
                 likes`}
            </span>
          </div>
          {props.images[props.index].likes.map((url) => (
            <LikeRow url={url} />
          ))}
          <Button color="primary" onClick={likesComponentOpen}>
            Close
          </Button>
        </div>
      </Dialog>
      <Dialog className={classes.divStyle} open={true} onClose={handleClose}>
        <DialogTitle id="max-width-dialog-title">Your Photos</DialogTitle>​
        <DialogContent className={classes.content}>
          <Button
            color="primary"
            onClick={() => props.changeIndex(props.index - 1)}
            className={classes.btn}
            disabled={props.index === 0 ? true : false}
          >
            prev
          </Button>
          <div className={classes.imgDiv}>
            <img
              src={props.images[props.index].img}
              className={classes.img}
            ></img>
          </div>
          <Button
            color="primary"
            onClick={() => props.changeIndex(props.index + 1)}
            disabled={props.images.length === props.index + 1 ? true : false}
          >
            Next
          </Button>
        </DialogContent>
        ​
        <DialogContent className={classes.icons}>
          <div className={classes.media}>
            <IconButton
              aria-label="add to favorites"
              name="likes"
              onClick={() =>
                props.handlerSetLike(props.index, auth().currentUser.uid)
              }
            >
              <FavoriteIcon color="secondary" />
            </IconButton>
            <IconButton onClick={likesComponentOpen}>
              {props.images[props.index].likes.length}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </div>
          <div className={classes.comments}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Typography>
              Comments {props.images[index].comments.length}
            </Typography>
          </div>
          <div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <div className={classes.commentArea}>
                  <div className={classes.commentInput}>
                    <TextField
                      id="outlined-full-width"
                      style={{ margin: 6 }}
                      placeholder="Write a comment"
                      margin="normal"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                    <Button
                      className={classes.addButton}
                      variant="contained"
                      color="primary"
                    >
                      Add
                    </Button>
                  </div>
                  <SliderComment />
                </div>
              </CardContent>
            </Collapse>
          </div>
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
    </div>
  );
}
export default PhotoSlider;
