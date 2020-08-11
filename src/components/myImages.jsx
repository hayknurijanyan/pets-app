import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {
    catdog
} from '../images/catdog.png';
const tileData = [{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

},
{
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image"

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
}));

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}