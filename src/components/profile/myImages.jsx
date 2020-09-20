import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CardActions, CardHeader, Card } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import PhotoSlider from "./photoSlider";
import ImageDrop from "./imageDrop";

import firebase, { storage } from "firebase";
import { useEffect } from "react";
import noImage from "../../images/noImage.png";
import Loader from "../loader";
import { db, auth } from "../../firebase";

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 5,
    margin: "auto",
    width: "120%",
  },
  noImage: {
    marginTop: "30px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  root: {
    minWidth: 350,
    marginTop: 20,
    maxWidth: 900,
    marginBottom: 30,
    paddingLeft: 35,
    paddingRight: 33,
  },
  content: {
    minWidth: 350,
    maxWidth: 720,
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 5,
    marginRight: 30,
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

export default function ImageGridList() {
  const [images, setImages] = useState(null);
  const [isSlider, setIsSlider] = useState("grid");
  const [imgIndex, setImgIndex] = useState(0);
  const [asd, setAsd] = useState(true);
  const [urls, setUrls] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const classes = useStyles();
  let toRender = null;
  let grid = null;
  // const urls = useCurrentUserData().photos;
  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const ref = db.collection("users").doc(user.uid);
        const collection = await ref.get();

        setUrls([...collection.data().photos]);
        setAvatar(collection.data().avatar);
        setFirstName(collection.data().firstName);
        setLastName(collection.data().lastName);
      } else {
        console.log("user data not found");
      }
    };
    fetchUserData();
  }, [asd, commentValue]);

  function toSlide(index) {
    setImgIndex(index);
    setIsSlider("slider");
  }
  function backToList() {
    setIsSlider("grid");
  }
  function toDrop() {
    setIsSlider("drop");
  }
  function changeIndexHandler(arg) {
    setImgIndex(arg);
  }
  function commentTextChangeHandler(text) {
    setCommentValue(text);
    console.log(commentValue, "ddd");
  }
  async function commentSubmitHandler() {
    const imagesArray = [...urls];
    const id = auth.currentUser.uid;
    const newComments = [...urls[imgIndex].comments];
    const newComment = {
      avatar,
      id,
      firstName,
      lastName,
      text: commentValue,
    };

    newComments.push({ ...newComment });
    imagesArray[imgIndex] = {
      url: imagesArray[imgIndex].url,
      comments: [...newComments],
      likes: [...imagesArray[imgIndex].likes],
    };
    db.collection("users").doc(auth.currentUser.uid).update({
      photos: firebase.firestore.FieldValue.delete(),
    });
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        photos: firebase.firestore.FieldValue.arrayUnion(...imagesArray),
      })
      .then(() => {
        setAsd(!asd);
      });
    setCommentValue("");
  }
  function setLike(index, likeOwner) {
    const imagesArray = [...urls];

    const imageLikes = [...imagesArray[index].likes];

    if (imageLikes.includes(likeOwner)) {
      imageLikes.splice(imageLikes.indexOf(likeOwner), 1);
    } else {
      imageLikes.push(likeOwner);
    }

    imagesArray[index] = {
      url: imagesArray[index].url,
      comments: [...imagesArray[index].comments],
      likes: [...imageLikes],
    };

    db.collection("users").doc(auth.currentUser.uid).update({
      photos: firebase.firestore.FieldValue.delete(),
    });
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        photos: firebase.firestore.FieldValue.arrayUnion(...imagesArray),
      })
      .then(() => setAsd(!asd));
  }

  if (urls) {
    const cols = [2, 1, 1, 1, 1, 1, 2, 1, 1, 1];
    let col = 0;
    const tileData = urls.map((url) => {
      if (col === cols.length) col = 0;
      return {
        img: url.url,
        likes: [...url.likes],
        comments: [...url.comments],
        cols: cols[col++],
        title: "image",
      };
    });
    if (urls.length) {
      grid = (
        <div className={classes.main}>
          <Card className={classes.root}>
            <CardHeader
              action={
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={toDrop}
                  >
                    Add image
                  </Button>
                </CardActions>
              }
              title={
                <Typography
                  className={classes.title}
                  color="primary"
                  variant="h5"
                >
                  Photos
                </Typography>
              }
            />
            <CardContent className={classes.content}>
              <div className={classes.root}>
                <GridList cellHeight={160} cols={3}>
                  {tileData.map((tile, index) => (
                    <GridListTile key={tile.img} cols={tile.cols}>
                      <img
                        src={tile.img}
                        alt={tile.title}
                        onClick={() => toSlide(index)}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      grid = (
        <div className={classes.noImage}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={toDrop}
          >
            Add image
          </Button>

          <div className={classes.noImage}>
            <img src={noImage}></img>
          </div>
        </div>
      );
    }
  } else {
    const tileData = <Loader />;
  }

  if (isSlider === "grid") {
    toRender = grid;
  } else if (isSlider === "slider") {
    const tileData = urls.map((url) => {
      return {
        img: url.url,
        likes: url.likes,
        comments: url.comments,
        cols: 1,
        title: "image",
      };
    });
    toRender = (
      <PhotoSlider
        clickHandler={toSlide}
        images={tileData}
        backClickHandler={backToList}
        index={imgIndex}
        changeIndex={changeIndexHandler}
        handlerSetLike={setLike}
        commentTextChange={commentTextChangeHandler}
        commentText={commentValue}
        commentSubmit={commentSubmitHandler}
      />
    );
  } else if (isSlider === "drop") {
    toRender = <ImageDrop backToList={backToList} />;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
      }}
    >
      {toRender}
    </div>
  );
}
