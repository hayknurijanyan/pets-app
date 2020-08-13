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
import EditPopover from "./editpopup";
import { Link } from "react-router-dom";
import image from "../images/dog.jpg";
import ImageAvatar from "./avatar";

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

export default function Post() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

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
        action={<EditPopover />}
        title={
          <Typography
            className={classes.name}
            component={Link}
            to="/profile"
            variant="h6"
          >
            Albert Einstein
          </Typography>
        }
        subheader="August 03, 2020"
      />
      <CardContent>
        <Typography variant="body1" color="black" component="p">
          Every dog owner has their own fascinating stories about their lovable
          pets.
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image="https://santansun.com/wp-content/uploads/2018/11/5b7fdeab1900001d035028dc.jpeg"
        // image ={image}
        title="Dog"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="secondary" />
        </IconButton>
        <Typography>13</Typography>
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
          Comments 3
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
        <Card className={classes.comment}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                H
              </Avatar>
            }
            action={<EditPopover />}
            title="Hayk Nurijanyan"
            subheader="August 03, 2020"
          />
          <CardContent className={classes.commentLine}>
            <Typography className={classes.commentText}>
              this is comments
            </Typography>
          </CardContent>
        </Card>
      </Collapse>
    </Card>
  );
}
