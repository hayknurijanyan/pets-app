import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { db, storage } from "../../firebase";
import uniqid from "uniqid";
import { MenuItem } from "@material-ui/core";
let log = console.log;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FilterBreed(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [userPet, setUserPet] = useState("");
  const { filterBy, petBreed, onHandlePetBreed, searchResult } = props;

  const newArray = [];
  searchResult.forEach((obj) => {
    newArray.push(obj.userPetInfo.breed);
  });

  const [state, setState] = useState({
    breed: "",
    name: "hai",
  });

  const handleChange = (e) => {
    onHandlePetBreed(e.target.value);
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`petBreed-native-helper`}>{filterBy}</InputLabel>
        <Select
          value={props.petBreed}
          onChange={handleChange}
          inputProps={{
            name: "breed",
            id: "petBreed-native-helper",
          }}
        >
          <MenuItem aria-label="None" value="" />
          {newArray.map((animal) => {
            return (
              <MenuItem key={uniqid()} value={animal}>
                {animal}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>Filter by {filterBy}</FormHelperText>
      </FormControl>
    </div>
  );
}
