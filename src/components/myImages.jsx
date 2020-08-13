import React from "react";
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
import EditPopover from "./editpopup";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { catdog } from "../images/catdog.png";
const tileData = [
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 2,
    title: "Image",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 2,
    title: "Image",
  },
  {
    img: "https://coverfiles.alphacoders.com/927/92705.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img:
      "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
    cols: 1,
    title: "Image",
  },
  {
    img:
      "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
    cols: 1,
    title: "Image",
  },
];

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    height: 1200,
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
  bio: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 30,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function About() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          action={
            <CardActions>
              <Button size="small" variant="outlined" color="primary">
                Edit
              </Button>
            </CardActions>
          }
          title={
            <Typography className={classes.title} color="primary" variant="h5">
              Photos
            </Typography>
          }
        />
        <CardContent className={classes.content}>
          <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {tileData.map((tile) => (
                <GridListTile key={tile.img} cols={tile.cols}>
                  <img src={tile.img} alt={tile.title} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import { catdog } from "../images/catdog.png";
// const tileData = [
//   {
//     img: "https://coverfiles.alphacoders.com/927/92705.jpg",
//     cols: 2,
//     title: "Image",
//   },
//   {
//     img:
//       "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img:
//       "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img: "https://coverfiles.alphacoders.com/927/92705.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img:
//       "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img:
//       "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img: "https://coverfiles.alphacoders.com/927/92705.jpg",
//     cols: 2,
//     title: "Image",
//   },
//   {
//     img:
//       "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img:
//       "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img: "https://coverfiles.alphacoders.com/927/92705.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img:
//       "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img:
//       "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
//     cols: 2,
//     title: "Image",
//   },
//   {
//     img: "https://coverfiles.alphacoders.com/927/92705.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img:
//       "https://storage.googleapis.com/petbacker/images/blog/2017/dog-and-cat-cover.jpg",
//     cols: 1,
//     title: "Image",
//   },
//   {
//     img:
//       "https://www.pethealthnetwork.com/sites/default/files/articles/dogs-cats-birds-and-bunnies-one-house-fb-167580013_0.jpg",
//     cols: 1,
//     title: "Image",
//   },
// ];
// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: 10,
//     width: "45 rem",
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: "80%",
//   },
// }));

// export default function ImageGridList() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <GridList cellHeight={160} className={classes.gridList} cols={3}>
//         {tileData.map((tile) => (
//           <GridListTile key={tile.img} cols={tile.cols}>
//             <img src={tile.img} alt={tile.title} />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   );
// }
