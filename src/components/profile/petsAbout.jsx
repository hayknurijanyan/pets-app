import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
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
    { text: "Name", value: name },
    { text: "Breed", value: breed },
    { text: "Gender", value: petsGender },
    { text: "Age", value: age },
    { text: "Behavior", value: behavior },
  ];
  return (
    <Card className={classes.root}>
      {dataArray.map((value) => (
        <FormControl className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">
            {value.text}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={(e) => props.handlerInput(e)}
            labelWidth={60}
            defaultValue={value.value}
          />
        </FormControl>
      ))}
    </Card>
  );
}
