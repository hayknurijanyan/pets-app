import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Divider,
  IconButton,
  TextField,
  Collapse,
  CardContent,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import XalxiLikeRow from "./xalxiLikeRow";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import XalxiSliderComment from "./xalxiSliderComment";
import { auth } from "firebase";

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: "100%",
    maxHeight: "auto",
    objectFit: "contain",
  },
  avatar: {
    width: "400px",
    height: "300px",
  },
  imgDiv: {
    maxWidth: "70%",
    height: "100%",
  },
  divStyle: {
    width: "100%",
  },
  likesComponent: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likesHeader: {
    marginTop: "3px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  likes: {
    height: "100%",
  },
  likesComponentDiv: {
    width: "500px",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentAdds: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  media: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 80,
    marginTop: 0,
  },
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
  btn: {
    color: "secondary",
    height: "100%",
  },
}));

function XalxiSlider(props) {
  const [index, setIndex] = useState(props.index);
  const [open, setOpen] = useState(true);
  const [likesComponent, setLikesComponent] = useState(false);
  const [likes, setLikes] = useState(null);
  const [expanded, setExpanded] = React.useState(false);
  console.log(props, "prprpr");
  function handleClose() {
    setOpen({ open: false });
    props.backClickHandler();
  }
  function likesComponentOpen() {
    setLikesComponent(!likesComponent);
  }
  function likesComponentOpen() {
    setLikesComponent(!likesComponent);
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();
  return (
    <>
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
              {`${props.images[props.index].img.likes.length}
                 likes`}
            </span>
          </div>

          <div className={classes.likes}>
            <Divider variant="middle" color="secondary" />
            {props.images[props.index].img.likes.map((url) => (
              <XalxiLikeRow url={url} />
            ))}
          </div>
          <Button
            color="primary"
            onClick={likesComponentOpen}
            className={classes.closeBtn}
          >
            Close
          </Button>
        </div>
      </Dialog>
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
              {`${props.images[props.index].img.likes.length}
             likes`}
            </span>
          </div>

          <div className={classes.likes}>
            <Divider variant="middle" color="secondary" />
            {props.images[props.index].img.likes.map((url) => (
              <XalxiLikeRow url={url} />
            ))}
          </div>
          <Button
            color="primary"
            onClick={likesComponentOpen}
            className={classes.closeBtn}
          >
            Close
          </Button>
        </div>
      </Dialog>
      <Dialog className={classes.divStyle} open={true} onClose={handleClose}>
        <DialogTitle id="max-width-dialog-title">Photos</DialogTitle>
        <DialogContent className={classes.content}>
          <Button
            color="primary"
            onClick={props.handlePrev}
            className={classes.btn}
            disabled={props.index === 0 ? true : false}
          >
            prev
          </Button>
          <Avatar
            src={props.images[props.index].img.url}
            variant="square"
            className={classes.avatar}
          ></Avatar>
          <Button
            color="primary"
            onClick={props.handleNext}
            disabled={props.images.length === props.index + 1 ? true : false}
          >
            Next
          </Button>
        </DialogContent>
        <DialogContent className={classes.icons}>
          <div className={classes.media}>
            <IconButton
              aria-label="add to favorites"
              name="likes"
              onClick={() => props.setLike(props.index, auth().currentUser.uid)}
            >
              <FavoriteIcon color="secondary" />
            </IconButton>
            <IconButton onClick={() => likesComponentOpen()}>
              {props.images[props.index].img.likes.length}
            </IconButton>
            <IconButton aria-label="share"></IconButton>
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
              Comments {props.images[props.index].img.comments.length}
            </Typography>
          </div>
          <div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <div className={classes.commentArea}>
                  <div className={classes.commentInput}>
                    <TextField
                      defaultValue={props.commentText}
                      id="outlined-full-width"
                      style={{ margin: 6 }}
                      placeholder="Write a comment"
                      onChange={() => console.log("asd")}
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
                      value={props.commentText}
                      onClick={() => console.log("asd")}
                    >
                      Add
                    </Button>
                  </div>
                  <XalxiSliderComment
                    images={props.images}
                    index={props.index}
                  />
                </div>
              </CardContent>
            </Collapse>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default XalxiSlider;
