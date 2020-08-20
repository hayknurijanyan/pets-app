import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";
import ListAltIcon from "@material-ui/icons/ListAlt";
import GroupIcon from "@material-ui/icons/Group";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    display: "flex",
    justifyContent: "row",
    alignItems: "center",
  },
  logoText: {
    marginRight: 3,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  icons: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function Navbar() {
  const classes = useStyles();
  const user = firebase.auth().currentUser;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <Typography variant="h6" className={classes.logoText}>
              Charo
            </Typography>
            <PetsOutlinedIcon />
          </div>
          {user && (
            <div className={classes.icons}>
              <IconButton color="inherit" component={Link} to="newsfeed">
                <ListAltIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="friends">
                <GroupIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="petfinder">
                <PetsOutlinedIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="users">
                <AccountBoxIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="services">
                <BusinessCenterIcon />
              </IconButton>
            </div>
          )}
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
