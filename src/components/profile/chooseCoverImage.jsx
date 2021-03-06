import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import ImageAvatar, { ImageAvatarSmall } from "./avatar";
import useCurrentUserData from "../customHooks/useCurrentUserData";
import Loader from "../loader";
import { db } from "../../firebase";
import { auth } from "firebase";
import uniqid from "uniqid";

export default function CoverImageChoose(props) {
  const [open, setOpen] = useState(props.form);
  let images = null;
  const urls = useCurrentUserData().photos;

  function setCoverImage(url) {
    db.collection("users").doc(auth().currentUser.uid).update({
      coverPhoto: url,
    });

    props.backToAccount();
    props.snap();
    props.toRender();
  }
  const useStyles = makeStyles((theme) => ({
    img: {
      maxWidth: "100%",
      maxHeight: "auto",
      objectFit: "contain",
    },
    imgDiv: {
      maxWidth: "70%",
      height: "100%",
    },
    divStyle: {
      width: "100%",
    },

    content: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    btn: {
      color: "secondary",
      height: "100%",
    },
  }));
  const classes = useStyles();
  if (urls) {
    if (urls.length === 0) {
      images = "You have no images";
    } else {
      images = (
        <div>
          {urls.map((photo) => {
            return (
              <div
                key={uniqid()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "spase-between",
                }}
              >
                <ImageAvatar imageUrl={photo.url} />
                <Button
                  color="primary"
                  onClick={() => setCoverImage(photo.url)}
                >
                  Select
                </Button>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <Dialog className={classes.divStyle} open={props.form.open}>
        <DialogTitle id="max-width-dialog-title">
          Choose image for cover photo
        </DialogTitle>
        <DialogContent className={classes.content}>{images}</DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={props.backToAccount}
            open={props.form.open}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return <Loader />;
  }
}
