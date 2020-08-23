import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
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
  const {
    bio,
    fName,
    lName,
    profession,
    gender,
    age,
    email,
    number,
  } = props.data;
  let dataArray = [
    { text: "Bio", value: bio, name: "bio" },
    { text: "Name", value: fName, name: "fName" },
    { text: "Surname", value: lName, name: "lName" },
    { text: "Prof", value: profession, name: "profession" },
    { text: "City", value: props.data.location.city, name: "city" },
    { text: "Country", value: props.data.location.country, name: "country" },
    { text: "Gender", value: gender, name: "gender" },
    { text: "Age", value: age, name: "age" },
    { text: "Email", value: email, name: "email" },
    { text: "Number", value: number, name: "number" },
  ];

  return (
    <Card className={classes.root}>
      {dataArray.map((value) => (
        <FormControl className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">
            {value.text}
          </InputLabel>
          <OutlinedInput
            name={value.name}
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
