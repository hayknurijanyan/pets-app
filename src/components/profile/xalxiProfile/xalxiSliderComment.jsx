import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
import ImageAvatar, { ImageAvatarSmall } from "../../profile/avatar";

let comments = null;
const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    borderRadius: 50,
    minHeight: 40,
    overflow: "wrap",
    marginLeft: 30,
    marginBottom: "0px",
    marginRight: "0px",
  },
  mainDiv: {
    border: "2px solid #fafafa",
    borderRadius: "5px",
  },
  name: { marginLeft: 2, marginBottom: 5 },
  avatar: {
    display: "flex",
    alignItems: "center",
    marginRight: 2,
  },
  commentText: {
    marginLeft: "40px",
    display: "flex",
    overflowWrap: "anywhere",
    backgroundColor: "#fafafa",
    borderRadius: "5px 0px 0px 0px ",
    color: "black",
    paddingLeft: "5px",
  },
  addButton: {
    width: 70,
    height: 54,
    marginBottom: 3,
  },
  commentLine: {
    backgroundColor: "#fafafa",
    borderRadius: 20,
  },
  main: { display: "flex" },
  large: {},
}));
export default function XalxiSliderComment(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { images, index } = props;
  if (images[index].img.comments.length) {
    comments = (
      <div className={classes.mainDiv}>
        {images[index].img.comments.map((user) => {
          return (
            <div className={classes.comment}>
              <div className={classes.avatar}>
                <ImageAvatar imageUrl={user.avatar} />
                {`${user.firstName}  ${user.lastName}`}
              </div>
              <div className={classes.commentText}>{user.text}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    comments = <div>No Comments</div>;
  }
  return <div>{comments}</div>;
}
