import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { db, storage } from "../../firebase";
import PropTypes from "prop-types";

let log = console.log;

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginTop: 5,
    marginBottom: 5,
    minWidth: 350,
  },
  formControlNew: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  petInput: {
    marginTop: 5,
    marginBottom: 4,
  },
}));

export default function PetsSelectFiled(props) {
  const {
    petGender,
    breed,
    petName,
    pet,
    petAge,
    onHandlePetSet,
    onHandleBreedSet,
    onHandlePetName,
    onHandlePetAge,
    onHandlePetGender,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [userPet, setUserPet] = useState("");

  useEffect(() => {
    const ref = db.collection("petsList").doc("Ch0cCMIMbhWDgaOF4za6");
    let collection = ref
      .get()
      .then((doc) => {
        const newArray = [...doc.data().pets];
        setList(newArray);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleChange = async (event) => {
    onHandlePetSet(event.target.value);
  };

  const handleBreed = async (event) => {
    onHandleBreedSet(event.target.value);
  };
  const handlePetName = async (event) => {
    onHandlePetName(event.target.value);
  };
  const handlePetAge = async (event) => {
    onHandlePetAge(event.target.value);
  };
  const handlePetGender = async (event) => {
    onHandlePetGender(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Grid className={classes.petInput}>
        <FormControl
          variant="outlined"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">Pet</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Pet"
            open={open}
            value={pet}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
          >
            <MenuItem>None</MenuItem>
            {list.map((animal, index) => {
              return (
                <MenuItem key={(index += "asd")} value={animal}>
                  {animal}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handlePetName}
            value={petName}
            placeholder="Pet Name"
            autoComplete="pname"
            name="Pet Name"
            variant="outlined"
            isRequired="true"
            fullWidth
            id="petname"
            label="Pet Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleBreed}
            value={breed}
            variant="outlined"
            fullWidth
            placeholder="Breed"
            id="breed"
            label="Breed"
            name="breed"
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.formControlNew}
            onChange={handlePetAge}
            value={petAge}
            fullWidth
            id="standard-number"
            label="Pet's Age"
            type="number"
            name="age"
            autoComplete="lname"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControlNew}>
            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={petGender}
              onChange={handlePetGender}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

PetsSelectFiled.propTypes = {
  petGender: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  petName: PropTypes.string.isRequired,
  pet: PropTypes.string.isRequired,
  petAge: PropTypes.string.isRequired,
  onHandlePetSet: PropTypes.func.isRequired,
  onHandleBreedSet: PropTypes.func.isRequired,
  onHandlePetName: PropTypes.func.isRequired,
  onHandlePetAge: PropTypes.func.isRequired,
  onHandlePetGender: PropTypes.func.isRequired,
};
