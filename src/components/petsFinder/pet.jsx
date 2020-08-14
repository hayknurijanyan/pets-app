import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  ButtonBase,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
} from "@material-ui/core";
let log = console.log;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 5,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 300,
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
}));

export default function Pet(props) {
  const classes = useStyles();

  log("props.result pet", props.result.pet);
  log("props", props);

  return (
    <div>
      {props.result.length
        ? props.result.map((obj) => {
            return (
              <div key={"asd" + 1} className={classes.root}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img
                          className={classes.img}
                          alt="complex"
                          src="https://images.photowall.com/products/57205/golden-retriever.jpg?h=699&q=85"
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="h6">
                            {obj.pet}
                          </Typography>
                          <Typography className={classes.row}>
                            <Typography variant="body2" gutterBottom>
                              age: {obj.petInfo.age}
                            </Typography>
                            <Typography variant="body2" color="secondary">
                              {`@${obj.pet}`}
                            </Typography>
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Behavior: {obj.petInfo.behavior}
                          </Typography>
                          <Divider />
                          <Typography variant="body2" color="textSecondary">
                            Owner:{" "}
                            {`${obj.owner.firstName} ${obj.owner.lastName}`}
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
  );
}
