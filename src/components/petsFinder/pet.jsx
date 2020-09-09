import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import logger from "../../services/logService";
import PropTypes from "prop-types";
let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: 10,
  },
  paper: {
    padding: theme.spacing(2),
    // maxWidth: 500,
    minWidth: 340,
    maxWidth: 800,
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
    // backgroundColor: "red",
  },
}));

export default function Pet(props) {
  const classes = useStyles();
  const { searchValue } = useParams();
  const { result } = props;
  return (
    <div className={classes.root}>
      <div className={classes.petBox}>
        {result.length
          ? result.map((obj) => {
              return (
                <div key={uniqid()} className={classes.root}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase className={classes.image}>
                          <img
                            className={classes.img}
                            alt="complex"
                            src={obj.defaultPetUrl}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="h6">
                              Name: {obj.userPetInfo.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body1"
                              color="textSecondary"
                            >
                              {obj.userPetInfo.breed}
                            </Typography>
                            <Typography className={classes.row}>
                              <Typography variant="body2" gutterBottom>
                                age: {obj.userPetInfo.age}
                              </Typography>
                              <Typography variant="body2" color="secondary">
                                {`@${obj.pet}`}
                              </Typography>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Behavior: {obj.userPetInfo.behavior}
                            </Typography>
                            <Divider />
                            <Typography variant="body2" color="textSecondary">
                              Owner: {`${obj.firstName} ${obj.lastName}`}
                            </Typography>
                          </Grid>
                          <Box
                            display="flex"
                            flexDirection="row-reverse"
                            p={1}
                            m={1}
                            bgcolor="background.paper"
                          >
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
    </div>
  );
}

Pet.propTypes = {
  result: PropTypes.array.isRequired,
};
