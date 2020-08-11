import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ImageAvatar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Hayk Nurijanyan" src="https://media-exp1.licdn.com/dms/image/C5603AQFznXFf91-MGw/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=JKeCnPy_jbnb02_JQ75Be9Aodr5D4FLaIVDBte1qr7w" className={classes.large} />
    </div>
  );
}