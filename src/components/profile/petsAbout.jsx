import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 30,
  },
  margin: {
    margin: theme.spacing(1),
    width: "88%",
  },
}));

export default function AboutEdit(props) {
  const classes = useStyles();

  const { age, name, breed, petsGender, behavior } = props.data;
  let dataArray = [
    { text: "Name", value: name, key: "petsName" },
    { text: "Breed", value: breed, key: "petsBreed" },
    { text: "Age", value: age, key: "petsAge" },
    { text: "Behavior", value: behavior, key: "petsBehavior" },
  ];
  return (
    <Card className={classes.root}>
      {dataArray.map((value) => (
        <FormControl className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">
            {value.text}
          </InputLabel>
          <OutlinedInput
            name={value.key}
            id="outlined-adornment-amount"
            onChange={(e) => props.handlerInput(e)}
            labelWidth={60}
            defaultValue={value.value}
          />
        </FormControl>
      ))}
      <FormControl variant="outlined" className={classes.margin}>
        <InputLabel name="petsGender">Gender</InputLabel>
        <Select
          label="petsGender"
          defaultValue={petsGender}
          name="petsGender"
          onChange={(e) => props.handlerInput(e)}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
      </FormControl>
    </Card>
  );
}
