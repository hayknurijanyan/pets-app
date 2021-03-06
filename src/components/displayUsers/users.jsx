import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { Toolbar, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import User from "./user";
import UpLoad from "../upLoadingFiles/upLoad";
import FilterGender from "./filterGender";
import { Router, Switch as Switched, Route, Redirect } from "react-router-dom";
import filterFunction from "./filterFunction";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import ChatBox from "../chat/chatBox";
import ChatMain from "../chat/chatMain";
import logger from "../../services/logService";
let log = console.log;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    marginTop: 5,
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  pos: {
    marginBottom: 12,
  },
  content: {
    display: "flex",
    width: "45rem",
  },
});

const Users = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [searchVal, setSearchVal] = useState("");
  const [searchArr, setSearchArr] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [userName, setUserName] = useState([]);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [emailArray, setEmailArray] = useState([]);
  const [showArr, setShowArr] = useState([]);

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      const newArray = [];
      const snapshot = await db.collection("users").get();
      snapshot.docs.forEach((doc) => {
        newArray.push(doc.data());
      });
      if (!unmounted) {
        setSearchArr(newArray);
        setShowArr(newArray);
      }
    };
    fetchData();

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    const ref = db.collection("users").doc(auth.currentUser.uid);
    ref
      .get()
      .then((doc) => {
        const newArray = [...doc.data().friends];
        setUserData({ ...doc.data() });
        const result = [];
        newArray.forEach((obj) => {
          result.push(obj.email);
        });
        setEmailArray(result);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };
  const handleClick = () => {
    setOpen(true);
    if (searchVal) {
      setOpen(false);
      const sVal = searchVal.trim();
      const newArr = [...searchArr];
      const myArr = newArr.filter(
        (man) => man.firstName.includes(sVal) || man.lastName.includes(sVal)
      );
      setShowArr(myArr);
    }
  };
  const handleReset = () => {
    setShowArr(searchArr);
    setSearchVal("");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkSearchVal = () => {
    if (!searchVal) {
      return (
        <Alert onClose={handleClose} severity="error">
          Please write something to search!
        </Alert>
      );
    }
  };

  return (
    <>
      <div>
        <Toolbar />
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          {checkSearchVal()}
        </Snackbar>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={searchVal}
                labelWidth={60}
                onChange={handleChange}
              />
            </FormControl>
            {/* <Switched>
              <Route path="pathName/:searchValue" component={Pet} />
            </Switched> */}
          </CardContent>
          <CardActions className={classes.button}>
            <Button
              onClick={handleReset}
              variant="contained"
              color="secondary"
              size="medium"
            >
              Reset
            </Button>
            <Button
              onClick={handleClick}
              variant="contained"
              color="primary"
              size="medium"
            >
              Search
            </Button>
          </CardActions>
        </Card>
        <User
          emailArray={emailArray}
          userData={userData}
          result={showArr}
          setEmailArray={setEmailArray}
        />
      </div>
    </>
  );
};

export default Users;
