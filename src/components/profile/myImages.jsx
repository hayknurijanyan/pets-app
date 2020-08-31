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
import firebase, { storage } from "firebase";
import { useEffect } from "react";
import noImage from "../../images/noImage.png";
import useCurrentUserData from "../customHooks/useCurrentUserData";
import Loader from "../loader";

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 5,
    margin: "auto",
    width: "120%",
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
        img: url.url,
        likes: [url.likes],
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
                  <Button size="small" variant="outlined" color="primary">
                    Edit
                  </Button>
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
        <div>
          <Card className={classes.root}>
            <CardHeader
              action={
                <CardActions>
                  <Button size="small" variant="outlined" color="primary">
                    Edit
                  </Button>
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
