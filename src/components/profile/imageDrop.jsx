import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Snackbar } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import firebase, { storage, auth } from "firebase";
import { getStoredState } from "redux-persist";
import { db } from "../../firebase";
import MuiAlert from "@material-ui/lab/Alert";

let log = console.log;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    backgroundColor: "#ef5350",
    color: "white",
    border: "none",
  },
}));

export default function ImageDrop(props) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        files.concat(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
    },
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const checkSuccessMessage = (suc) => {
    return (
      <Alert onClose={handleClose} severity="success">
        {suc.message}
      </Alert>
    );
  };
  function uploadHandler() {
    const user = firebase.auth().currentUser;
    if (user) {
      files.forEach(async (file) => {
        const referance = storage().ref();
        const uploadTask = referance.child(`images/${user.uid}/${file.name}`);
        await uploadTask.put(file);
        const newImage = await uploadTask.getDownloadURL();
        const newUrl = {
          url: newImage,
          likes: [],
          comments: [],
        };
        await db
          .collection("users")
          .doc(auth().currentUser.uid)

          .update({
            photos: firebase.firestore.FieldValue.arrayUnion(newUrl),
          });
      });
      setSuccess({ message: "images saved" });
      checkSuccessMessage(success);
      setOpen(true);
    }
    setFiles([]);
    const timeout = setTimeout(() => props.backToList(), 3000);
  }
  function handleDelete(url) {
    setFiles(files.filter((file) => file.preview !== url));
  }
  const images = (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-end",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {files.map((file) => (
        <div
          key={file.name}
          style={{
            width: "120px",
            height: "120px",
            display: "flex",
            flexDirection: "row",
            alignContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <img
              src={file.preview}
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                borderRadius: "3px",
                marginBottom: "3px",
                objectFit: "contain",
              }}
              alt="picture"
            />
            <Button
              className={classes.deleteButton}
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(file.preview)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "space-around",
        marginTop: "20px",
        width: "100%",
        alignContent: "center",
        minHeight: "150px",
      }}
    >
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {checkSuccessMessage(success)}
      </Snackbar>
      <div
        style={{
          marginTop: "20px",

          width: "100%",
          alignContent: "center",
          minHeight: "150px",
        }}
      >
        <div
          {...getRootProps()}
          style={{
            width: "100%",
            height: "100%",
            alignContent: "center",
            display: "flex",
          }}
        >
          <input {...getInputProps()} />
          <p style={{ textAlign: "center", width: "100%", fontSize: "30px" }}>
            Click here to choose or drag your picture
          </p>
        </div>
      </div>
      <div>{images}</div>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={uploadHandler}
      >
        <p>Upload {`(${files.length})`} files</p>
      </Button>
    </div>
  );
}
