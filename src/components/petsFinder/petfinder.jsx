import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Toolbar, Switch } from "@material-ui/core";
import AllPets from "../allpets";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Pet from "./pet";
import { Router, Switch as Switched, Route, Redirect } from "react-router-dom";
import {
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
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
});

const Petfinder = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [searchVal, setSearchVal] = useState("");
  const [searchArr, setSearchArr] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const ref = db.collection("petsFinder").doc("9EjERLCKRVowoWKnC1j5");
    let collection = ref
      .get()
      .then((doc) => {
        const newArray = [...doc.data().allPetsSearch];
        setSearchArr(newArray);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };
  const handleClick = () => {
    if (searchVal) {
      const sVal = searchVal.toLowerCase();
      const newArr = [...searchArr];
      const myArr = newArr.filter((animal) => animal.pet.includes(sVal));
      setSearchResult(myArr);
    } else alert("write something");
  };

  return (
    <>
      <div>
        <Toolbar />
        <Card className={classes.root}>
          <CardContent>
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
            <Switched>
              <Route path="pathName/:searchValue" component={Pet} />
            </Switched>
            {/* <Pet result={searchResult} /> */}
          </CardContent>
          <CardActions className={classes.button}>
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
        <Pet result={searchResult} />
      </div>
    </>
  );
};

export default Petfinder;
