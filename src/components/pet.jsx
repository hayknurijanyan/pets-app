import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, ButtonBase, Typography, Button, Paper, Grid, Divider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 5
  },
  paper: {
    padding: theme.spacing(2),
    minWidth:300
  },
  image: {
    width: 128,
    height: 128,
  },
  row: {
    display:'flex',
justifyContent:'space-between',

  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function Pet() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://images.photowall.com/products/57205/golden-retriever.jpg?h=699&q=85" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='h6'>
                  Golden Retriever
                </Typography>
              <Typography className={classes.row}>
                <Typography variant="body2" gutterBottom>
                  age: 7
                </Typography>
                <Typography variant="body2" color="secondary">
                  @dog
                </Typography>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Behavior: Playful
                </Typography>
                <Divider/>
                <Typography  variant="body2" color="textSecondary">
                  Owner: Hayk Nurijanyan
                </Typography>
              </Grid>
              <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">
              <Button variant="contained" color="primary" >
                Contact
                </Button>
            </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}