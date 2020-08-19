import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import uniqid from "uniqid";
import {
  Box,
  ButtonBase,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "22rem",
    margin: 5,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  button: {
    marginLeft: "10px",
  },
  petBox: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function User(props) {
  const classes = useStyles();
  const { searchValue } = useParams();

  return (
    <div className={classes.petBox}>
      {props.result.length
        ? props.result.map((obj, index) => {
            return (
              <div key={uniqid()} className={classes.root}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img
                          className={classes.img}
                          alt="complex"
                          src={obj.avatar}
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="h6">
                            Name: {obj.firstName}
                          </Typography>
                          <Typography gutterBottom variant="h6">
                            {obj.pet}
                          </Typography>
                          <Typography className={classes.row}>
                            <Typography variant="body2" gutterBottom>
                              age: {obj.age}
                            </Typography>
                            <Typography variant="body2" color="secondary">
                              asd {/* {`@${obj.userPetInfo.breed}`} */}
                            </Typography>
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            asd
                          </Typography>
                          <Divider />
                          <Typography variant="body2" color="textSecondary">
                            asd
                          </Typography>
                        </Grid>
                        <Box
                          display="flex"
                          flexDirection="row-reverse"
                          p={1}
                          m={1}
                          bgcolor="background.paper"
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={() => props.handleDeleteClick(index)}
                          >
                            Delete
                          </Button>
                          <Button variant="contained" color="primary">
                            Contact
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            );
          })
        : ""}
    </div>
  );
}
