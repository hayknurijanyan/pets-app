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

const drawerWidth = 240;

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
    overflow: "auto",
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

// import React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@material-ui/core/AppBar";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Divider from "@material-ui/core/Divider";
// import Drawer from "@material-ui/core/Drawer";
// import Hidden from "@material-ui/core/Hidden";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
// import Logout from "./logout";
// import ImageAvatar from "./profile/avatar";

// const drawerWidth = 260;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   main: {
//     marginTop: 200,
//   },
//   drawer: {
//     [theme.breakpoints.up("sm")]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     [theme.breakpoints.up("sm")]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

// function SidebarLeft(props) {
//   const { window } = props;
//   const classes = useStyles();
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <div className={classes.root}>
//       <div className={classes.toolbar} />
//       <Divider />
//       <List>
//         <ListItem button component={Link} to="profile">
//           <ListItemIcon>
//             <ImageAvatar />
//           </ListItemIcon>
//           <Typography variant="h6">My Account</Typography>
//         </ListItem>
//       </List>
//       <Divider />
//       <List>
//         {["Newsfeed", "Friends", "Petfinder", "Users", "Services"].map(
//           (text, index) => (
//             <ListItem
//               button
//               component={Link}
//               to={text.toLowerCase()}
//               key={text}
//             >
//               <ListItemText primary={text} />
//             </ListItem>
//           )
//         )}
//         <ListItem>
//           <Logout />
//         </ListItem>
//       </List>
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <div className={classes.main}>
//       {/* <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             className={classes.menuButton}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Responsive drawer
//           </Typography>
//         </Toolbar>
//       </AppBar> */}
//       <Toolbar />
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Hidden smUp implementation="css">
//           <Drawer
//             container={container}
//             variant="temporary"
//             anchor={theme.direction === "rtl" ? "right" : "left"}
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//         <Hidden xsDown implementation="css">
//           <Drawer
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             variant="permanent"
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//       </nav>
//     </div>
//   );
// }

// SidebarLeft.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

// export default SidebarLeft;

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   CssBaseline,
//   Avatar,
//   AppBar,
//   Drawer,
//   Toolbar,
//   List,
//   Divider,
//   ListItem,
//   ListItemIcon,
//   Typography,
//   ListItemText,
// } from "@material-ui/core";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import Post from "./newsfeed/post";

// const drawerWidth = 260;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerContainer: {
//     overflow: "auto",
//   },
//   content: {
//     flexGrow: 1,
//     justifyContent: "center",
//     padding: theme.spacing(3),
//   },
// }));

// export default function SidebarLeft() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar item xs={0} position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <Typography variant="h6" noWrap>
//             Charo
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <Toolbar />
//         <div className={classes.drawerContainer}>
//           <List>
//             <ListItem button component={Link} to="profile">
//               <ListItemIcon>
//                 <ImageAvatar />
//               </ListItemIcon>
//               <Typography variant="h6">My Account</Typography>
//             </ListItem>
//           </List>
//           <Divider />
// <List>
//   {["Newsfeed", "Friends", "Petfinder", "Users", "Services"].map(
//     (text, index) => (
//       <ListItem
//         button
//         component={Link}
//         to={text.toLowerCase()}
//         key={text}
//       >
//         <ListItemText primary={text} />
//       </ListItem>
//     )
//   )}
//   <ListItem>
//     <Logout />
//   </ListItem>
// </List>
//         </div>
//       </Drawer>
//     </div>
//   );
// }
