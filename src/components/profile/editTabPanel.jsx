import React from "react";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";

import EditIcon from "@material-ui/icons/Edit";

import Box from "@material-ui/core/Box";
import AboutEdit from "./aboutEdit";
import PetsAbout from "./petsAbout";
import uniqid from "uniqid";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    position: "relative",
    minHeight: 200,
  },
  tab: {
    // backgroundColor: "#4caf50",
    // color: "white",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(-2),
    right: theme.spacing(2),
  },
  fab2: {
    position: "absolute",
    bottom: theme.spacing(-2),
    right: theme.spacing(10),
  },
  fabGreen: {
    color: theme.palette.common.white,
    // backgroundColor: green[500],
    "&:hover": {
      // backgroundColor: green[600],
    },
  },
}));

export default function EditTabPanel(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      className2: classes.fab2,
      icon: <EditIcon />,
      label: "Add",
    },
    {
      color: "primary",
      className: classes.fab,
      className2: classes.fab2,
      icon: <EditIcon />,
      label: "Edit",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          color="primary"
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab
            color="primary"
            label="Your info"
            {...a11yProps(0)}
            className={classes.tab}
          />
          <Tab
            color="primary"
            label="Your pets info"
            {...a11yProps(1)}
            className={classes.tab}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AboutEdit data={props.data} handlerInput={props.handlerInput} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PetsAbout
            data={props.data.userPetInfo}
            handlerInput={props.handlerInput}
          />
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <div key={uniqid()}>
          <Zoom
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${
                value === index ? transitionDuration.exit : 0
              }ms`,
            }}
            unmountOnExit
          >
            <Fab
              aria-label={fab.label}
              className={fab.className}
              color={fab.color}
              onClick={props.handlerSubmit}
            >
              Save
            </Fab>
          </Zoom>
          <Zoom
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${
                value === index ? transitionDuration.exit : 0
              }ms`,
            }}
            unmountOnExit
          >
            <Fab
              aria-label={fab.label}
              className={fab.className2}
              color={fab.color}
              onClick={props.handlerBack}
            >
              back
            </Fab>
          </Zoom>
        </div>
      ))}
    </div>
  );
}
