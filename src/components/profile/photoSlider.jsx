import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@material-ui/core";
import useCurrentUserData from "../customHooks/useCurrentUserData";
import { db } from "../../firebase";
import { ImageAvatarSmall } from "./avatar";
import Loader from "../loader";
import firebase from "firebase";

function PhotoSlider(props) {
  const [index, setIndex] = useState(props.index);
  const [open, setOpen] = useState(true);
  const [likesOpen, setLikesOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  let likes = null;
  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().propse.images[index];
      if (user) {
        const ref = db.collection("users").doc(user.uid);
        const collection = await ref.get();

        setUserData({ ...collection.data() });
      } else {
        console.log("user data not found");
      }
    };
    fetchUserData();
  }, []);

  if (userData) {
    const image = userData.photos[index];
    console.log(image, "image");
    likes = (
      <div style={{ width: "500px", height: "500px" }}>
        {Array.from(image.likes).map(async (uid) => {
          console.log("a");
          const userRef = db.collection("users").doc(uid);
          const user = await userRef.get();
          const data = user.data();
          if (data) {
            return (
              <div>
                asd
                <ImageAvatarSmall
                  imageUrl={
                    data.avatar !== ""
                      ? data.avatar
                      : "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg"
                  }
                />
                <FavoriteBorderIcon
                  color="primary"
                  style={{ width: "80", height: "80" }}
                >
                  Back
                </FavoriteBorderIcon>
                <hr />
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    likes = (
      <div>
        <Loader />
        <FavoriteBorderIcon
          color="primary"
          style={{ width: "80", height: "80" }}
        >
          Back
        </FavoriteBorderIcon>
      </div>
    );
  }

  function handleClose() {
    setOpen({ open: false });
    props.backClickHandler();
  }
  function handleLikesClose() {
    setLikesOpen(!likesOpen);
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
      width: "80%",
      height: "auto",
      objectFit: "contain",
      overflow: "hidden",
    },
    btn: {
      // position: "absolute",
      width: "20%",
    },
    btnNext: {
      right: "0px",
      // position: "absolute",
      width: "20%",
    },
    divStyle: {
      width: "100%",
      maxWidth: "100vw",
      maxHeight: "100%",
      position: "absolute",
      top: "50%",
      left: "0",
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      overflowY: "hidden",
    },
    nestedDiv: {
      width: "70%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    imgDiv: {
      width: "100%",
      height: "70%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    content: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    likes: {
      width: "200px",
      height: "200px",
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={likesOpen}
        onClose={handleLikesClose}
        className={classes.likes}
      >
        <div className={classes.content}>{likes}</div>
        <Button onClick={handleLikesClose}></Button>
      </Dialog>
      <Dialog open={true} onClose={handleClose} className={classes.content}>
        {/* <DialogContent className={classes.content} name="content"> */}
        <div className={classes.nestedDiv}>
          <div name="imgdiv" className={classes.imgDiv}>
            <Button
              color="primary"
              onClick={handlePrev}
              className={classes.btn}
            >
              prev
            </Button>
            <img src={props.images[index].img} className={classes.img}></img>
            <Button
              color="primary"
              onClick={handleNext}
              className={classes.btnNext}
            >
              Next
            </Button>
          </div>
          <IconButton>
            <FavoriteBorderIcon color="primary" onClick={handleLikesClose} />
          </IconButton>
          <div>{props.images[index].likes.length}</div>
        </div>
        {/* </DialogContent> */}
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
    </>
  );
}

export default PhotoSlider;
