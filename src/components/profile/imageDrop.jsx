import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import UpLoad from "../upLoadingFiles/upLoad";
import { Button } from "@material-ui/core";

export default function ImageDrop() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const images = (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {files.map((file) => (
        <div
          key={file.name}
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              flexWrap: "wrap",
            }}
          >
            <img
              src={file.preview}
              style={{ width: "150px", height: "150px" }}
              alt="picture"
            />
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
      <Button variant="contained" size="medium" color="primary">
        Upload
      </Button>
    </div>
  );
}
