import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import EditPopover from "../newsfeed/editpopup";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { catdog } from "../../images/catdog.png";
import PhotoSlider from "./photoSlider";
import ImageDrop from "./imageDrop";
import UpLoad from "../upLoadingFiles/upLoad";

import { useEffect } from "react";
import noImage from "../../images/noImage.png";
import useCurrentUserData from "../customHooks/useCurrentUserData";
import Loader from "../loader";
import { db, auth, storage } from "../../firebase";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    maxWidth: 720,
    marginBottom: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardHeader: {
    width: "100%",
    display: "flex",
    msFlexDirection: "row",
    justifyContent: "space-between",
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
});

export default function ImageGridList() {
  const [images, setImages] = useState({ a: 5 });
  const [isSlider, setIsSlider] = useState("grid");
  const [imgIndex, setImgIndex] = useState(0);
  const classes = useStyles();
  let toRender = null;
  let grid = null;
  const urls = useCurrentUserData().photos;

  function toSlide(index) {
    setImgIndex(index);
    setIsSlider("slider");
  }
  function deleteImage(url) {
    let newImgArray;
    const del = async (url) => {
      const ref = db.collection("users").doc(auth.currentUser.uid);
      let collection = await ref.get();
      let imgArray = await collection.data().photos;

      newImgArray = imgArray.filter((elem) => elem !== url);
      return url;
    };
    del(url)
      .then((url) => {
        console.log(url, "users url");
        db.collection("users").doc(auth.currentUser.uid).update({
          photos: newImgArray,
        });
        return url;
      })
      .then((url) => {
        console.log(url, "storage url");
        var storageRef = storage.ref();
        var desertRef = storageRef.child(`images/${auth.currentUser.uid}`);
        var imageRef = desertRef.child(`${url}`);
        imageRef.delete().then(() => console.log("deleted sacsessfully"));
      });
    // .then((url) => {
    //   var storageRef = storage().ref();
    //   var desertRef = storageRef.child(`images/${auth.currentUser.uid}`);
    //   var imageRef = desertRef.child(`${url}`);
    //   imageRef
    //     .delete()
    //     .then(function () {
    //       console.log(
    //         storageRef.child(`images/${auth.currentUser.uid}/${url}`)
    //       );
    //     })
    //     .catch(function (error) {
    //       // Uh-oh, an error occurred!
    //     });
    // });
  }
  function backToList() {
    setIsSlider("grid");
  }
  function toDrop() {
    setIsSlider("drop");
  }
  if (urls) {
    const cols = [2, 1, 1, 1, 1, 1, 2, 1, 1, 1];
    let col = 0;
    const tileData = urls.map((url) => {
      if (col === cols.length) col = 0;
      return {
        img: url,
        cols: cols[col++],
        title: "image",
      };
    });
    if (urls.length) {
      grid = (
        <div>
          <Card className={classes.root}>
            <CardHeader
              className={classes.cardHeader}
              action={
                <CardActions>
                  {/* <Button size="small" variant="outlined" color="primary">
                    Edit
                  </Button> */}
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
                <GridList
                  cellHeight={160}
                  className={classes.gridList}
                  cols={3}
                >
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
          <Card className={classes.root}>
            <CardHeader
              action={
                <CardActions>
                  {/* <Button size="small" variant="outlined" color="primary">
                    Edit
                  </Button> */}
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
            />
          </Card>
          <div className={classes.root}>
            <img src={noImage}></img>;
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
        img: url,
        cols: 1,
        title: "image",
      };
    });
    toRender = (
      <PhotoSlider
        onDelete={deleteImage}
        clickHandler={toSlide}
        images={tileData}
        backClickHandler={backToList}
        index={imgIndex}
      />
    );
  } else if (isSlider === "drop") {
    toRender = <ImageDrop backToList={() => backToList()} />;
  }

  return <div className={classes.root}>{toRender}</div>;
}
