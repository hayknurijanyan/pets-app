import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedAction } from "../actions";
import { store } from "../index";
import SidebarLeft from "./sidebarleft.jsx";
import SidebarRight from "./sidebarright.jsx";
import { makeStyles } from '@material-ui/core/styles';
import { Card,Toolbar, ListItem, List, Avatar,ListItemAvatar,ListItemText,Typography, Button } from '@material-ui/core';
import Pet from "./pet.jsx";

const useStyles = makeStyles((theme) => ({
  container:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },

  main:{
    display:'flex',
    flexWrap: 'wrap',
    marginTop:10,
    marginLeft:5,
    justifyContent:'flex-start',
  },
  button:{
    width:100,
    height:30,
  },
}));



function Friend() {
  const classes = useStyles()
  
  return (
  <div>
      <Card className={ classes.main }>
      <List className={classes.container}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://www.zone4homes.com/themes/fo/img/avatar.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Name Surname"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="secondary"
              >
                @dog
              </Typography>
              {" — Yerevan"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Button className={classes.button} variant='contained' color="secondary">Remove</Button>
      </List>
      </Card>
  </div>
  );
}

export default Friend;