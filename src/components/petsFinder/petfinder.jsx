import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Toolbar } from "@material-ui/core";
import AllPets from "../allpets";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
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

  const handleClick = () => {};

  return (
    <div>
      <Toolbar />
      <Card className={classes.root}>
        <CardContent>
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
      <AllPets />
    </div>
  );
};

export default Petfinder;
