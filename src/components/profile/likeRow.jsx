import React, { useState } from "react";
import { db } from "../../firebase";
import ImageAvatar, { ImageAvatarSmall } from "./avatar";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";

export default function LikeRow(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const fetchData = async function () {
      const ref = db.collection("users").doc(props.url);
      const user = await ref.get();
      console.log(props.url);
      console.log(user.data(), "mmmmmmmmmmmmmmmmm");
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
      <hr />
    </div>
  );
}
