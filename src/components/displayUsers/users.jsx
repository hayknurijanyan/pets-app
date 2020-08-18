import React, { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedAction } from "../../actions";
import { store } from "../../index";
import SidebarLeft from "../sidebarleft.jsx";
import SidebarRight from "../sidebarright.jsx";
import { makeStyles } from "@material-ui/core/styles";
import User from "./user.jsx";
import { Toolbar, Switch } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Router, Switch as Switched, Route, Redirect } from "react-router-dom";
import FilterBreed from "./filter";
import {
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";

let log = console.log;

const useStyles = makeStyles({
  root: {
    marginTop: 10,
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

function Users() {
  const classes = useStyles();
  const [usersObject, setusersObject] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [searchResult, setsearchResult] = useState([]);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          newArray.push(doc.data());
          setusersObject(newArray);
          // console.log(doc.id, " => ", doc.data());
        });
      });
  }, []);

  log("userobject", usersObject);
  const handleChange = () => {};
  const handleClick = () => {};
  return (
    <div className={classes.main}>
      <Toolbar />
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={searchVal}
              labelWidth={60}
              onChange={handleChange}
            />
          </FormControl>
        </CardContent>
        <CardActions className={classes.button}>
          <FilterBreed
            filterBy={"pet"}
            petBreed={usersObject}
            searchResult={searchResult}
          />

          <Button
            onClick={handleClick}
            variant="contained"
            color="secondary"
            size="medium"
          >
            Search
          </Button>
        </CardActions>
      </Card>
      <User />
    </div>
  );
}

export default Users;
