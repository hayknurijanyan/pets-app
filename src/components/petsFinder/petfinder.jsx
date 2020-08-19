import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Toolbar, Switch } from "@material-ui/core";
import EveryPet from "./everyPet";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Pet from "./pet";
import UpLoad from "../upLoadingFiles/upLoad";
import FilterBreed from "./filterBreed";
import FilterGender from "./filterGender";
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
  content: {
    display: "flex",
    width: "45rem",
  },
});

const Petfinder = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [searchVal, setSearchVal] = useState("");
  const [searchArr, setSearchArr] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [petGender, setPetGender] = useState("");
  const [petBreed, setPetBreed] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const newArray = [];
      const snapshot = await db.collection("users").get();
      snapshot.docs.forEach((doc) => {
        newArray.push(doc.data());
        setSearchArr(newArray);
      });
    };
    fetchData();
  }, []);

  log("searchArr", searchArr);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };
  const handleClick = () => {
    if (searchVal) {
      if (!petGender && !petBreed) {
        const sVal = searchVal.toLowerCase().trim();
        const newArr = [...searchArr];
        const myArr = newArr.filter((animal) => animal.pet.includes(sVal));
        setSearchResult(myArr);
      } else if (petGender && !petBreed) {
        const sVal = searchVal.toLowerCase().trim();
        const newArr = [...searchArr];
        const myArr = newArr.filter(
          (animal) =>
            animal.pet.includes(sVal) &&
            animal.userPetInfo.petsGender === petGender
        );
        setSearchResult(myArr);
      }
    } else alert("write something");
  };
  const handleDeleteClick = (index) => {
    const newSearchResult = [...searchResult];
    newSearchResult.splice(index, 1);
    setSearchResult(newSearchResult);
  };

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
            <FilterBreed
              onHandlePetBreed={setPetBreed}
              searchResult={searchResult}
              petBreed={petBreed}
              filterBy={"Breed"}
              searchResult={searchResult}
              onAge={handleFilterAge}
            />
            <FilterGender
              onHandlePetGender={setPetGender}
              petGender={petGender}
              filterBy={"Breed"}
              searchResult={searchResult}
              onBreed={handleFilterBreed}
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

        <Pet handleDeleteClick={handleDeleteClick} result={searchResult} />
        {/* <EveryPet result={searchResult} /> */}
      </div>
    </>
  );
};

export default Petfinder;
