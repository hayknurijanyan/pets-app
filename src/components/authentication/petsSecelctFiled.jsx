import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { db, storage } from "../../firebase";

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

  // const onFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = storage.ref();
  //   const fileRef = storageRef.child(file.name);
  //   await fileRef.put(file);
  //   setFileUrl(await fileRef.getDownloadURL());
  // };

  const handleChange = async (event) => {
    props.onHandlePetSet(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
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
          value={props.pet}
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
    </div>
  );
}
