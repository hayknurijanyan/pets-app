import {
  Typography,
  makeStyles,
  AppBar,
  Tab,
  Zoom,
  Box,
  Tabs,
  useTheme,
} from "@material-ui/core";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import EditIcon from "@material-ui/icons/Edit";
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

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "90%",
    position: "relative",
    minHeight: 200,
    marginTop: "20px",
  },
  pText: {
    fontSize: "30px",
  },
  //   tab: {
  //     borderRadius: "10px",
  //   },
  //   fab: {
  //     position: "absolute",
  //     bottom: theme.spacing(-2),
  //     right: theme.spacing(2),
  //   },
  //   fab2: {
  //     position: "absolute",
  //     bottom: theme.spacing(-2),
  //     right: theme.spacing(10),
  //   }
}));

export default function XalxiProfile(props) {
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
            label="User info"
            {...a11yProps(0)}
            className={classes.tab}
          />
          <Tab
            color="primary"
            label="Pets info"
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
          <ul style={{ listStyle: "none" }}>
            <li>
              <p>First name</p>

              <p className={classes.pText}>{props.userInfo.fName}</p>
              <hr />
            </li>
            <li>
              <p>Last name</p>

              <p className={classes.pText}>{props.userInfo.lName}</p>
              <hr />
            </li>
            <li>
              <p>Age</p>

              <p className={classes.pText}>{props.userInfo.age}</p>
              <hr />
            </li>
            <li>
              <p>Profession</p>

              <p className={classes.pText}>{props.userInfo.Profession}</p>
              <hr />
            </li>
            <li>
              <p>City</p>

              <p className={classes.pText}>{props.userInfo.city}</p>
              <hr />
            </li>
            <li>
              <p>Country</p>

              <p className={classes.pText}>{props.userInfo.country}</p>
              <hr />
            </li>
            <li>
              <p>EMeil</p>

              <p className={classes.pText}>{props.userInfo.email}</p>
              <hr />
            </li>
            <li>
              <p>Gender</p>

              <p className={classes.pText}>{props.userInfo.gender}</p>
              <hr />
            </li>
            <li>
              <p>Contact number</p>

              <p className={classes.pText}>{props.userInfo.number}</p>
            </li>
          </ul>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {
            <ul style={{ listStyle: "none" }}>
              <li>
                <p>Name</p>

                <p className={classes.pText}>{props.petInfo.name}</p>
                <hr />
              </li>
              <li>
                <p>Breed</p>

                <p className={classes.pText}>{props.petInfo.breed}</p>
                <hr />
              </li>
              <li>
                <p>Age</p>

                <p className={classes.pText}>{props.petInfo.age}</p>
                <hr />
              </li>
              <li>
                <p>Gender</p>

                <p className={classes.pText}>{props.petInfo.gender}</p>
                <hr />
              </li>
              <li>
                <p>Behavior</p>

                <p className={classes.pText}>{props.petInfo.behavior}</p>
              </li>
            </ul>
          }
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
