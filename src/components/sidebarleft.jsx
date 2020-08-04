import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Avatar, AppBar, Drawer, Toolbar, List, Divider, ListItem, ListItemIcon, Typography, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Post from './post';


const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: theme.spacing(3),

    },
}));

export default function SidebarLeft() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Logo
                        </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button component="a" href="profile">
                            <ListItemIcon>
                                <Avatar alt="Hayk" src="/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="My Account" />
                        </ListItem>

                    </List>
                    <Divider />
                    <List>
                        {['Newsfeed', 'Friends', 'Petfinder', 'Services'].map((text, index) => (
                            <ListItem button component="a" href={text.toLowerCase()} key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}