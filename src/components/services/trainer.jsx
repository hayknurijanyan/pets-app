import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Call from "./call";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Trainer() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://www.petpipers.com/wp-content/uploads/2019/05/event-marker.jpg"
          title="Trainigs"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            Trainings
          </Typography>
          <Typography>
            Dog training at PetSmart includes classes for all levels and ages!
          </Typography>
        </CardContent>
        <CardActions>
          <Call />
          <Button size="small" color="primary">
            <Link
              href="https://www.thesprucepets.com/steps-to-train-your-dog-1118273"
              target="_blank"
            >
              View
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
