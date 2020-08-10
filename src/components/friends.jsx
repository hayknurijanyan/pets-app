// import React, { useEffect } from "react";
// import { db } from "../firebase.js";
// import { useDispatch, useSelector } from "react-redux";
// import { isLoggedAction } from "../actions";
// import { store } from "../index";
// import SidebarLeft from "./sidebarleft.jsx";
// import SidebarRight from "./sidebarright.jsx";

// let log = console.log;
// function Friends() {
//   // useEffect(() => {
//   //   const ref = db.collection("users").doc("asd");
//   //   const collection = ref.get();
//   //   const a = collection.then((asd) => asd);
//   //   log("db result", a);
//   // });

//   const isLogged = useSelector((state) => state.isLogged);
//   const dispatch = useDispatch();
//   return (
//     <div style={{ marginTop: 100 }}>
//       <SidebarLeft />
//       {" "}
//       <input type="text" onChange={() => log("asd")} value={isLogged} />
//       <button onClick={() => dispatch(isLoggedAction())}>press me </button>
//       <SidebarRight />
//     </div>
//   );
// }

// export default Friends;


import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedAction } from "../actions";
import { store } from "../index";
import SidebarLeft from "./sidebarleft.jsx";
import SidebarRight from "./sidebarright.jsx";
import Friend from "./friend.jsx";
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container:{
    display:'flex',
    flexDirection:'row',
  },

  root:{
    display:'flex',
    flexWrap: 'wrap',
    marginTop:100,
    marginLeft:20,
    marginRight:20,
    justifyContent:'flex-start'
  },
  content: {
      flexGrow: 1,
      padding: theme.spacing(3),

  },
}));



function Friends() {
  const classes = useStyles()

  return (
  <div className = {classes.container}>
    <div>
    <SidebarLeft />
    </div>
    <div className={ classes.root }>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      

    </div>
    <div>
        <SidebarRight />
        </div>
        </div>
  );
}

export default Friends;

