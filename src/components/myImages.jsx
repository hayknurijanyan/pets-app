import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {
    catdog
} from '../images/catdog.png';
import { IconButton, GridListTileBar } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const tileData = [{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image name"

},
{
    img: "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image name"
},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image name"

},
{
    img: "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 2,
    title: "Image name"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image name"

},
{
    img: "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image name"

}]
const useStyles = makeStyles((theme) => ({
  root: {
      margin: 10,
      width: '45 rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
  },
  title: {
    color: theme.palette.primary.light,
  },
}));

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols}>
            <img src={tile.img} alt={tile.title} onClick={()=>console.log("asd")}/>
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <FavoriteBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}