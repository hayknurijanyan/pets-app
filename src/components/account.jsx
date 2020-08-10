import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Toolbar, Grid, Divider } from '@material-ui/core';
import ImageAvatar from './avatar';
import Popup from './popup';
import Message from './message';
import image from '../images/dg1.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    width:'45rem',
    marginTop:10,
    borderRadius:20,
  },
  media: {
    marginTop:-40,
    height: 280,

  },
  buttons:{
    marginTop:30,
    display:'flex',
    justifyContent:'space-between',


  },
  button:{
    margin:2

  },
  avatar:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  }
}));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Toolbar/>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
          />
        <CardContent>
          <div className={classes.avatar}>
            <ImageAvatar/>
          <Typography gutterBottom variant="h5" component="h2">
            Hayk Nurijanyan
          <Typography variant="body2" color="textSecondary" component="p">
            <Popup/>
          </Typography>
          </Typography>
         </div>
      <Grid container className={classes.buttons}>
          <div>
         <Message/>
         </div>
         <div>
        <Button className={classes.button} 
        variant="contained" size="medium" color="primary">
          About
        </Button>
        <Button className={classes.button} 
        variant="contained" size="medium" color="primary">
          Pets
        </Button>
        <Button className={classes.button} 
        variant="contained" size="medium" color="primary">
          Photos
        </Button>
        <Button className={classes.button} 
        variant="contained" size="medium" color="primary">
          Friends
        </Button>
        </div>
      </Grid>
        </CardContent>
    </Card>
  );
}