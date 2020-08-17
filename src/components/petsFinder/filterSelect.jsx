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

export default function FilterSelect(props) {
  const { filterBy } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">{filterBy} </InputLabel>
        <NativeSelect
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: `${filterBy}`,
            id: `${filterBy}-native-helper`,
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>{filterBy}</option>
          <option value={20}>{filterBy}</option>
          <option value={30}>{filterBy}</option>
        </NativeSelect>
        <FormHelperText>Filter by {filterBy} </FormHelperText>
      </FormControl>
    </div>
  );
}
