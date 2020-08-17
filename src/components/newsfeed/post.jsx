import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@material-ui/core";
import { Avatar, IconButton, Typography, Collapse } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import image from "../../images/dog.jpg";
import ImageAvatar from "../profile/avatar";
import PostImage from "./postimage";
import Comments from "./comments";
import EditPopup from "./editpopup";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  name: {
    textDecoration: "none",
    color: "black",
  },
  avatar: {
    backgroundColor: red[500],
    textDecoration: "none",
  },
  comment: {
    margin: 20,
  },
  commentText: {
    marginLeft: 10,
  },
  commentInput: {
    display: "flex",
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
  },
  addButton: {
    width: 70,
    height: 54,
    marginBottom: 3,
  },
  commentLine: {
    backgroundColor: "#fafafa",
    // borderRadius: 5,
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let color = "";
  color = props.color === true ? "secondary" : "none";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <ImageAvatar
            component={Link}
            to="/profile/"
            aria-label="recipe"
            className={classes.avatar}
          >
            H
          </ImageAvatar>
        }
        action={<EditPopup onDelete={props.onDelete} onEdit={props.onEdit} />}
        title={
          <Typography
            className={classes.name}
            component={Link}
            to="/profile"
            variant="h6"
          >
            {props.name}
          </Typography>
        }
        subheader={String(props.date)}
      />
      <CardContent>
        <Typography variant="body1" color="black" component="p">
          {props.text}
        </Typography>
      </CardContent>
      <PostImage />
      <CardActions disableSpacing>
        <IconButton onClick={props.isliked} aria-label="add to favorites">
          <FavoriteIcon color={color} />
        </IconButton>
        <Typography>{props.likeCount}</Typography>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Typography style={{ marginRight: 10 }} color="textSecondary">
          Comments {props.commentCount}
        </Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.commentInput}>
          <TextField
            id="outlined-full-width"
            style={{ margin: 6 }}
            placeholder="Write a comment"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <Button
            className={classes.addButton}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
        <Comments />
      </Collapse>
    </Card>
  );
}
