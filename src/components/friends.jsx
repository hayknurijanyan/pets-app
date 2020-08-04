import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedAction } from "../actions";
import { store } from "../index";
import SidebarLeft from "./sidebarleft.jsx";
import SidebarRight from "./sidebarright.jsx";

let log = console.log;
function Friends() {
  // useEffect(() => {
  //   const ref = db.collection("users").doc("asd");
  //   const collection = ref.get();
  //   const a = collection.then((asd) => asd);
  //   log("db result", a);
  // });

  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: 100 }}>
      <SidebarLeft />
      {" "}
      <input type="text" onChange={() => log("asd")} value={isLogged} />
      <button onClick={() => dispatch(isLoggedAction())}>press me </button>
      <SidebarRight />
    </div>
  );
}

export default Friends;
