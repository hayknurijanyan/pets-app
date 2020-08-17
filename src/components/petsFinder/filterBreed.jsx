import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FulterBreed(props) {
  const { filterBy, petBreed, onHandlePetBreed } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    gender: "",
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
        <InputLabel htmlFor="breed-native-helper">breed</InputLabel>
        <NativeSelect
          value={state.breed}
          onChange={handleChange}
          inputProps={{
            name: "breed",
            id: "breed-native-helper",
          }}
        >
          <option aria-label="None" value="" />

          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
        <FormHelperText>Filter by breed</FormHelperText>
      </FormControl>
    </div>
  );
}
