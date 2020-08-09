import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { db } from "../firebase";
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
}));

export default function PetsSelectFiled(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    props.onHandlePetSet(event.target.value);
  };
  log(props.petList);
  const handleClose = (event) => {
    setOpen(false);
  };

  const handleOpen = (event) => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Pet</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
        >
          <MenuItem>
            <em>None</em>
          </MenuItem>
          {/* {props.petList.pets.map((pet, index) => {
            return (
              <div key={(pet += 1)}>
                <div value={index} primaryText={pet}></div>
              </div>
            );
          })} */}
          {/* <MenuItem value={"cat"}>Cat</MenuItem>
          <MenuItem value={"dog"}>Dog</MenuItem>
          <MenuItem value={"fish"}>Fish</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}

{
  /* <div>
  <DropDownMenu
    value={this.state.selectedColorValue}
    onChange={this.handleColorChange}
  >
    {colors.map((color, index) => (
      <MenuItem key={index} value={index} primaryText={color} />
    ))}
  </DropDownMenu>
</div>; */
}
