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
const tileData = [
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image name",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image name",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 2,
    title: "Image name",
  },
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image",
  },
];
function getImages(value, setValue) {
  // const user = firebase.auth().currentUser;
  // const images = storage().ref(user.uid);
  // storage()
  //   .ref(`images/${images}`)
  //   .once("value")
  //   .then((snapshot) => {
  //     setValue({ value: snapshot.val() });
  //     console.log(images);
  //   })
  //   .catch((error) => console.error(error));
}
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    maxWidth: 720,
    marginBottom: 30,
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
  const [images, setImages] = useState({});
  const [isSlider, setIsSlider] = useState("grid");
  const [imgIndex, setImgIndex] = useState(0);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let toRender = null;
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
  useEffect((images, setImages) => {
    getImages(images, setImages);
  });
  if (isSlider === "grid") {
    toRender = (
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
              <GridList cellHeight={160} className={classes.gridList} cols={3}>
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
  } else if (isSlider === "slider") {
    toRender = (
      <PhotoSlider
        clickHandler={toSlide}
        images={tileData}
        backClickHandler={backToList}
        index={imgIndex}
      />
    );
  } else if (isSlider === "drop") {
    toRender = <ImageDrop />;
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
