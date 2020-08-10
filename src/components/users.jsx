import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedAction } from "../actions";
import { store } from "../index";
import SidebarLeft from "./sidebarleft.jsx";
import SidebarRight from "./sidebarright.jsx";
import { makeStyles } from '@material-ui/core/styles';
import User from "./user.jsx";

const useStyles = makeStyles((theme) => ({
  container:{
    display:'flex',
    flexDirection:'row',
  },

  main:{
    display:'flex',
    flexWrap: 'wrap',
    marginTop:80,
  },
}));



function Users() {
  const classes = useStyles()
  
  return (
      <div className={ classes.main }>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
      </div>
  );
}

export default Users;