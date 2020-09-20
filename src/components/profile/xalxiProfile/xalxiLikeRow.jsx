import React, { useState } from "react";
import { db } from "../../../firebase";
import ImageAvatar, { ImageAvatarSmall } from ".././avatar";
import { useEffect } from "react";
import { makeStyles, Divider } from "@material-ui/core";

export default function XalxiLikeRow(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const fetchData = async function () {
      const ref = db.collection("users").doc(props.url);
      const user = await ref.get();
      const name = user.data().firstName;
      const lastName = user.data().lastName;
      const avatar = user.data().avatar;
      setName(name);
      setLastName(lastName);
      setAvatar(avatar);
    };
    fetchData();
  });
  const useStyles = makeStyles((theme) => ({
    main: {
      padding: "10px",
      display: "flex",
      flexDIrection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "30px",
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main}>
        <ImageAvatar imageUrl={avatar} />
        {`${name} ${lastName}`}
      </div>
      <Divider variant="middle" color="secondary" />
    </div>
  );
}
