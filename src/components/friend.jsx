import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, ButtonBase, Typography, Button, Paper, Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 5
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function Friend() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='h6'>
                  Name Surname
                </Typography>
                <Typography variant="body2" gutterBottom>
                  @dog @cat
                </Typography>
                <Typography  variant="body2" color="textSecondary">
                  Information
                </Typography>
              </Grid>
              <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">
              <Button variant="contained" color="secondary" >
                Remove
                </Button>
            </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}