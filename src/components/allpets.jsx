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
import Pet from "./pet.jsx";

const useStyles = makeStyles((theme) => ({
  container:{
    display:'flex',
    flexDirection:'row',
  },

  main:{
    display:'flex',
    flexWrap: 'wrap',
    marginTop:20,
    justifyContent:'flex-start'
  },
}));



function AllPets() {
  const classes = useStyles()
  
  return (
      <div className={ classes.main }>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
        <Pet/>
      </div>
  );
}

export default AllPets;

