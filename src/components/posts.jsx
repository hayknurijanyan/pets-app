import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import Post from './post';



const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: theme.spacing(3),

    },
}));



const Posts = () => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <Toolbar />
            <Post />
            <Post />
            <Post />
        </main>
    );
}

export default Posts;