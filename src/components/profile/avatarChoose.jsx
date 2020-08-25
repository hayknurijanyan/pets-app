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

export default function AvatarChoose(props) {
  const [open, setOpen] = useState(props.form);

  const urls = useCurrentUserData().photos;

  function setAvatarImage(url) {
    db.collection("users").doc(auth().currentUser.uid).update({
      avatar: url,
    });

    props.backToAccount();
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
    return (
      <Dialog className={classes.divStyle} open={props.form.open}>
        <DialogTitle id="max-width-dialog-title">
          Choose image for avatar
        </DialogTitle>
        <DialogContent className={classes.content}>
          <div>
            {urls.map((url) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "spase-between",
                  }}
                >
                  <ImageAvatar imageUrl={url} />
                  <Button color="primary" onClick={() => setAvatarImage(url)}>
                    Select
                  </Button>
                </div>
              );
            })}
          </div>
        </DialogContent>
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
