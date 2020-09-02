import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EmailIcon from "@material-ui/icons/Email";
import SettingsIcon from "@material-ui/icons/Settings";
import { Typography } from "@material-ui/core";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { theme2, theme1, dark1, dark2 } from "../theme";
import ThemeContext from "../context/themeContext";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
let log = console.log;

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
  menuItem: {
    display: "flex",
    margin: 5,
  },
  text: {
    marginLeft: 10,
  },
}));

export function AccountIconButton(props) {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorDark, setAnchorDark] = useState(null);
  const [themeState, setThemeState] = useState(true);
  const [themeDark, setThemeDark] = useState(true);
  const setThemeContext = useContext(ThemeContext);

  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDarkClose = () => {
    setAnchorDark(null);
  };

  const handleAccount = () => {};

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .catch((e) => e.message);
    // window.location.reload(false);
  };

  const handleThemeChange = () => {
    if (themeState) {
      setThemeContext(theme2);
      setThemeState(!themeState);
    } else {
      setThemeContext(theme1);
      setThemeState(!themeState);
    }
  };

  const handleDarkChange = () => {
    if (themeDark) {
      setThemeContext(dark1);
      setThemeDark(!themeDark);
    } else {
      setThemeContext(dark2);
      setThemeDark(!themeDark);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircleIcon variant="outlined" fontSize="medium" />
      </IconButton>
      <Menu
        onClick={handleClose}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          className={classes.menuItem}
          button
          component={Link}
          to="profile"
        >
          <AccountCircleIcon />
          <Typography className={classes.text}>Account</Typography>
        </MenuItem>
        <MenuItem
          fullWidth
          className={classes.menuItem}
          onClick={handleThemeChange}
        >
          <ColorLensIcon color="primary" />
          <Typography className={classes.text}>Theme</Typography>
        </MenuItem>

        <MenuItem className={classes.menuItem} onClick={handleDarkChange}>
          <Brightness4RoundedIcon color="primary" />
          <Typography className={classes.text}>Dark Mode</Typography>
        </MenuItem>

        <MenuItem className={classes.menuItem} onClick={handleLogout}>
          <ExitToAppIcon color="secondary" />
          <Typography className={classes.text}>Log out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export function EmailIconButton(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <EmailIcon variant="outlined" fontSize="medium" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Inbox</MenuItem>
        <MenuItem onClick={handleClose}>Send Message</MenuItem>
      </Menu>
    </div>
  );
}

export function NotificationIconButton(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <NotificationsIcon variant="outlined" fontSize="medium" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Show All</MenuItem>
        <MenuItem onClick={handleClose}>Clear All</MenuItem>
      </Menu>
    </div>
  );
}
