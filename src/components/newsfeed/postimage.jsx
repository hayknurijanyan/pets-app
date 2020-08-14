import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const PostImage = () => {
  const classes = useStyles();
  return (
    <div>
      <CardMedia
        className={classes.media}
        image="https://santansun.com/wp-content/uploads/2018/11/5b7fdeab1900001d035028dc.jpeg"
        // image ={image}
        title="Dog"
      />
    </div>
  );
};

export default PostImage;
