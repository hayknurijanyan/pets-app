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

export default function FilterGender(props) {
  const { filterBy, petGender, onHandlePetGender } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    gender: "",
    name: "hai",
  });

  const handleChange = (e) => {
    onHandlePetGender(e.target.value);
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="gender-native-helper">gender</InputLabel>
        <NativeSelect
          value={petGender}
          onChange={handleChange}
          inputProps={{
            name: "gender",
            id: "gender-native-helper",
          }}
        >
          <option aria-label="None" value="" />
          <option value={"male"}>male</option>
          <option value={"female"}>female</option>
        </NativeSelect>
        <FormHelperText>Filter by gender</FormHelperText>
      </FormControl>
    </div>
  );
}
