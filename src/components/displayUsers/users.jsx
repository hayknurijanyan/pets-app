import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
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
import {
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import ChatBox from "../chat/chatBox";
import ChatMain from "../chat/chatMain";
let log = console.log;

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
  const [userName, setUserName] = useState("");
  const [showUsers, setShowUsers] = useState("");
  // const [petBreed, setPetBreed] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const newArray = [];
      const snapshot = await db.collection("users").get();
      snapshot.docs.forEach((doc) => {
        newArray.push(doc.data());
      });
      setSearchArr(newArray);
      setShowUsers(newArray);
    };
    fetchData();
  }, []);

  log("searchArr", searchArr);

  const handleChange = (e) => {
    // e.preventDefault();
    setSearchVal(e.target.value);
  };

  const handleClick = () => {
    if (searchVal) {
      const sVal = searchVal.trim();
      const newArr = [...searchArr];
      const myArr = newArr.filter(
        (man) => man.firstName.includes(sVal) || man.lastName.includes(sVal)
      );

      setShowUsers(myArr);
    } else alert("write something");
  };
  const handleDeleteClick = (index) => {
    const newSearchResult = [...searchResult];
    newSearchResult.splice(index, 1);
    setSearchResult(newSearchResult);
  };

  log("user searchResult", searchResult);
  log("user searchArr", searchArr);
  const handleFilterAge = () => {};
  const handleFilterBreed = () => {};
  const handleFilterName = () => {};
  const handleFilterBehavior = () => {};

  return (
    <>
      <div>
        <Toolbar />
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
            {/* <Pet result={searchResult} /> */}
          </CardContent>
          <CardActions className={classes.button}>
            {/* <FilterBreed
              onHandlePetBreed={setPetBreed}
              searchResult={searchResult}
              petBreed={petBreed}
              filterBy={"Breed"}
              searchResult={searchResult}
              onAge={handleFilterAge}
            /> */}
            {/* <FilterGender
              onHandlePetGender={setPetGender}
              petGender={petGender}
              filterBy={"Breed"}
              searchResult={searchResult}
              onBreed={handleFilterBreed}
            /> */}

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
        <User handleDeleteClick={handleDeleteClick} result={showUsers} />
        {/* <EveryPet result={searchResult} /> */}
      </div>
    </>
  );
};

export default Users;
