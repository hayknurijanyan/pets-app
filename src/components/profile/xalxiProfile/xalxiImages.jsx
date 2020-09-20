import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CardActions, CardHeader, Card } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PhotoSlider from "./xalxiSlider";
import noImage from "../../../images/noImage.png";
import Loader from "../../loader";
import { db, auth, storage } from "../../../firebase";
import { useEffect } from "react";
import firebase from "firebase";

const useStyles = makeStyles({
  main: {
    width: "80%",
    // minWidth: 800,
  },
  root: {
    width: "100%",
    marginTop: 20,
    // maxWidth: 900,
    paddingLeft: 35,
    paddingRight: 33,
  },
  cardHeader: {
    width: "100%",
    display: "flex",
    msFlexDirection: "row",
    justifyContent: "space-between",
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

  title: {
    marginLeft: 30,
  },
});

export default function XalxiImages(props) {
  const [images, setImages] = useState(null);
  const [isSlider, setIsSlider] = useState("grid");
  const [imgIndex, setImgIndex] = useState(0);
  const [asd, setAsd] = useState(false);
  const classes = useStyles();
  let toRender = null;
  let grid = null;
  useEffect(() => {
    setImages(props.images);
  }, [asd]);
  console.log(images, "forLike");
  function toSlide(index) {
    setImgIndex(index);
    setIsSlider("slider");
  }
  function setLike(index, likeOwner) {
    const imagesArray = [...images];

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

    db.collection("users").doc(props.userId).update({
      photos: firebase.firestore.FieldValue.delete(),
    });
    db.collection("users")
      .doc(props.userId)
      .update({
        photos: firebase.firestore.FieldValue.arrayUnion(...imagesArray),
      })
      .then(() => setAsd(!asd));
  }
  function backToList() {
    setIsSlider("grid");
  }
  function nextIndex() {
    setImgIndex(imgIndex + 1);
  }
  function prevIndex() {
    setImgIndex(imgIndex - 1);
  }
  if (images !== null) {
    const cols = [2, 1, 1, 1, 1, 1, 2, 1, 1, 1];
    let col = 0;
    const tileData = images.map((url) => {
      if (col === cols.length) col = 0;
      return {
        img: url.url,
        likes: [...url.likes],
        comments: [...url.comments],
        cols: cols[col++],
        title: "image",
      };
    });
    if (images.length) {
      grid = (
        <div>
          <Card className={classes.root}>
            <CardHeader
              className={classes.cardHeader}
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
        <div className={classes.root}>
          <img src={noImage}></img>;
        </div>
      );
    }
  } else {
    const tileData = <Loader />;
  }

  if (isSlider === "grid") {
    toRender = grid;
  } else if (isSlider === "slider") {
    const tileData = images.map((url) => {
      return {
        img: url,
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
        handlePrev={prevIndex}
        handleNext={nextIndex}
        setLike={setLike}
      />
    );
  }
  return <div className={classes.root}>{toRender}</div>;
}
