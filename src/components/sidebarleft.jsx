import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import ImageAvatar from "./profile/avatar";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";
import {
  AccountIconButton,
  NotificationIconButton,
  EmailIconButton,
} from "./navbarbuttons";
import ListAltIcon from "@material-ui/icons/ListAlt";
import GroupIcon from "@material-ui/icons/Group";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "hidden",
  },
  logo: {
    display: "flex",
    justifyContent: "row",
    alignItems: "center",
  },
  logoText: {
    marginRight: 3,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  accountIcon: {
    color: "white",
  },
  listItem: {
    margin: 5,
    alignItems: "center",
  },
  listText: {
    marginLeft: 10,
  },
}));

export default function SidebarLeft() {
  const classes = useStyles();
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      // .then(() => alert("logout succsess"))
      .catch((e) => e.message);
    // window.location.reload(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <Typography variant="h6" className={classes.logoText}>
              Charo
            </Typography>
            <PetsOutlinedIcon />
          </div>
          <div className={classes.toolbar}>
            <EmailIconButton />
            <NotificationIconButton />
            <AccountIconButton />
          </div>
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
          <Divider />
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
            {/* {["Newsfeed", "Friends", "Petfinder", "Users", "Services"].map(
            (text, index) => ( */}
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="newsfeed"
            >
              <ListAltIcon />
              <Typography className={classes.listText} variant="body1">
                Newsfeed
              </Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="friends"
            >
              <GroupIcon />
              <Typography className={classes.listText} variant="body1">
                Friends
              </Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="petfinder"
            >
              <PetsOutlinedIcon />
              <Typography className={classes.listText} variant="body1">
                Petfinder
              </Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="users"
            >
              <AccountBoxIcon />
              <Typography className={classes.listText} variant="body1">
                Users
              </Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="services"
            >
              <BusinessCenterIcon />
              <Typography className={classes.listText} variant="body1">
                Services
              </Typography>
            </ListItem>
            {/* )
            )} */}
            <Divider />
            <ListItem
              component={Link}
              to="signin"
              className={classes.listItem}
              onClick={handleLogout}
              button
            >
              <ExitToAppIcon color="secondary" />
              <Typography className={classes.listText}>Log out</Typography>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
