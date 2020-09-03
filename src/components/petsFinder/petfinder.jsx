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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
let log = console.log;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  root: {
    margin: 25,
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
    flexDirection: "column",
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
  const [showPets, setShowPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [breedArr, setBreedArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newArray = [];
      const snapshot = await db.collection("users").get();
      snapshot.docs.forEach((doc) => {
        newArray.push(doc.data());
      });
      setSearchArr(newArray);
      setShowPets(newArray);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleClick = () => {
    setOpen(true);

    if (searchVal) {
      setOpen(false);
      if (!petBreed && !petGender) {
        const sVal = searchVal.toLowerCase().trim();
        const newArr = [...searchArr];
        const myArr = newArr.filter((animal) => animal.pet.includes(sVal));
        setShowPets(myArr);
        const breedSet = new Set();
        myArr.map((obj) => {
          breedSet.add(obj.userPetInfo.breed);
        });
        const arr = [];
        for (let val of breedSet) {
          arr.push(val);
        }
        setBreedArr(arr);
      } else if (petBreed && !petGender) {
        const sVal = searchVal.toLowerCase().trim();
        const newArr = [...searchArr];
        const myArr = newArr.filter((animal) => animal.pet.includes(sVal));
        const result = myArr.filter(
          (animal) => animal.userPetInfo.breed === petBreed
        );
        setShowPets(result);
        const breedSet = new Set();
        myArr.map((obj) => {
          breedSet.add(obj.userPetInfo.breed);
        });
        const arr = [];
        for (let val of breedSet) {
          arr.push(val);
        }
        setBreedArr(arr);
      } else if (petBreed && petGender) {
        const sVal = searchVal.toLowerCase().trim();
        const newArr = [...searchArr];
        const myArr = newArr.filter((animal) => animal.pet.includes(sVal));
        const result = myArr.filter(
          (animal) => animal.userPetInfo.breed === petBreed
        );

        const resultGender = result.filter(
          (animal) => animal.userPetInfo.petsGender === petGender
        );
        log("petGender", petGender);
        setShowPets(resultGender);
        const breedSet = new Set();
        myArr.map((obj) => {
          breedSet.add(obj.userPetInfo.breed);
        });
        const arr = [];
        for (let val of breedSet) {
          arr.push(val);
        }
        setBreedArr(arr);
      } else if (!petBreed && petGender) {
        const sVal = searchVal.toLowerCase().trim();
        const newArr = [...searchArr];
        const myArr = newArr.filter((animal) => animal.pet.includes(sVal));
        // const result = myArr.filter(
        //   (animal) => animal.userPetInfo.breed === petBreed
        // );
        const resultGender = myArr.filter(
          (animal) => animal.userPetInfo.petsGender === petGender
        );
        log("petGender", petGender);
        setShowPets(resultGender);
        const breedSet = new Set();
        myArr.map((obj) => {
          breedSet.add(obj.userPetInfo.breed);
        });
        const arr = [];
        for (let val of breedSet) {
          arr.push(val);
        }
        setBreedArr(arr);
      }
    }
  };

  const handleReset = () => {
    setShowPets(searchArr);
    setPetGender("");
    setPetBreed("");
    setSearchVal("");
  };
  const handleFilterAge = () => {};
  const handleFilterBreed = () => {};
  const handleFilterName = () => {};
  const handleFilterBehavior = () => {};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkSearchVal = () => {
    if (!searchVal && !petBreed && !petGender) {
      return (
        <Alert onClose={handleClose} severity="error">
          Please write or select something to search!
        </Alert>
      );
    } else if (!searchVal && !petBreed) {
      return (
        <>
          <Alert onClose={handleClose} severity="error">
            Please select breed or type something!
          </Alert>
        </>
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
            <div>
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
            </div>
            <div>
              <CardActions className={classes.button}>
                <FilterBreed
                  onHandlePetBreed={setPetBreed}
                  petBreed={petBreed}
                  filterBy={"Breed"}
                  onAge={handleFilterAge}
                  breedArr={breedArr}
                />
                <FilterGender
                  onHandlePetGender={setPetGender}
                  petGender={petGender}
                  filterBy={"Gender"}
                  searchResult={searchResult}
                  onBreed={handleFilterBreed}
                />
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
                  disabled={!searchVal}
                >
                  Search
                </Button>
              </CardActions>
            </div>
          </CardContent>
        </Card>

        <Pet result={showPets} />
        {/* <EveryPet result={searchResult} /> */}
      </div>
    </>
  );
};

export default Petfinder;
