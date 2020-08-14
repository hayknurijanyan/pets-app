import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Avatar,
  AppBar,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Post from "./post";
import { Link } from "react-router-dom";
import Logout from "./logout";
import ImageAvatar from "./Profile/avatar";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing(3),
  },
}));

export default function SidebarLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar item xs={0} position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Charo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to="profile">
              <ListItemIcon>
                <ImageAvatar />
              </ListItemIcon>
              <Typography variant="h6">My Account</Typography>
            </ListItem>
          </List>
          <Divider />
          <List>
            {["Newsfeed", "Friends", "Petfinder", "Users", "Services"].map(
              (text, index) => (
                <ListItem
                  button
                  component={Link}
                  to={text.toLowerCase()}
                  key={text}
                >
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
            <ListItem>
              <Logout />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
