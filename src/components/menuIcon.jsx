import React from "react";
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
import MenuIcon from "@material-ui/icons/Menu";

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

export function MenuIconButton(props) {
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

  const handleAccount = () => {};

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      // .then(() => alert("logout succsess"))
      .catch((e) => e.message);
    window.location.reload(false);
  };

  return (
    <div>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
        {/* <Menu variant="outlined" fontSize="medium" /> */}
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
        <MenuItem
          className={classes.menuItem}
          button
          component={Link}
          to="profile"
        >
          <AccountCircleIcon />
          <Typography className={classes.text}>Account</Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          <ColorLensIcon color="primary" />
          <Typography className={classes.text}>Theme</Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleLogout}>
          <ExitToAppIcon color="secondary" />
          <Typography className={classes.text}>Log out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
