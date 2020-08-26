import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CardActions, CardHeader, Card } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PhotoSlider from "./xalxiSlider";
import noImage from "../../../images/noImage.png";
import Loader from "../../loader";
import { db, auth, storage } from "firebase";

const useStyles = makeStyles({
  main: {
    minWidth: 800,
  },
  root: {
    minWidth: 350,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
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
    marginLeft: 20,
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

export default function XalxiImages(props) {
  const [images, setImages] = useState({ a: 5 });
  const [isSlider, setIsSlider] = useState("grid");
  const [imgIndex, setImgIndex] = useState(0);
  const classes = useStyles();
  let toRender = null;
  let grid = null;
  const urls = props.images;

  function toSlide(index) {
    setImgIndex(index);
    setIsSlider("slider");
  }

  function backToList() {
    setIsSlider("grid");
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
        <div className={classes.main}>
          <Card className={classes.root}>
            <CardHeader
              className={classes.cardHeader}
              action={
                <CardActions>
                  {/* <Button size="small" variant="outlined" color="primary">
                    Edit
                  </Button> */}
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
    const tileData = urls.map((url) => {
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
      />
    );
  }
  return <div className={classes.root}>{toRender}</div>;
}
