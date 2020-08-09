import React, { Component } from "react";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

export default class PetsSelectFiledClass extends Component {
  state = {
    list: [],
    open: false,
  };
  classes = () => useStyles();

  async componentDidMount() {
    try {
      const ref = db.collection("petsList").doc("Ch0cCMIMbhWDgaOF4za6");
      const collection = await ref.get();
      log(collection.data().pets);
      this.setState({ list: collection.data().pets });
    } catch (e) {
      log(e.message, "error");
    }
  }

  handleChange = (event) => {
    this.onHandlePetSet(event.target.value);
  };

  handleClose = (event) => {
    this.setState({ open: false });
  };

  handleOpen = (event) => {
    this.setState({ open: true });
  };
  render() {
    const myList = [...this.state.list];
    log("myList", myList);
    return (
      <div>
        <FormControl fullWidth className={this.classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Pet</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={this.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            onChange={this.handleChange}
          >
            {/* {myList.map((animal, index) => {
              <div key={(animal += index)}>
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={animal} primaryText={animal}></MenuItem>;
              </div>;
            })} */}
            {/* <MenuItem value={"cat"}>Cat</MenuItem>
            <MenuItem value={"dog"}>Dog</MenuItem>
            <MenuItem value={"fish"}>Fish</MenuItem> */}
          </Select>
        </FormControl>
      </div>
    );
  }
}
