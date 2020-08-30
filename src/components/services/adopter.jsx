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

export default function Adopter() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://images.squarespace-cdn.com/content/v1/5d2d2868fca61000017073bb/1567792544192-RZ3F20ENMEANE2H37764/ke17ZwdGBToddI8pDm48kFyD7pzB8zoMIVY5aiUuFlp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0jG2lbcDYBOeMi4OFSYem8DMb5PTLoEDdB05UqhYu-xbnSznFxIRsaAU-3g5IaylIg/MPMar30-0017.jpg?format=2500w"
          title="Pet Adopter"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            Pet Adoption
          </Typography>
          <Typography>
            There are many myths and misconceptions about adopting pets. Learn
            the truth and get the facts.
          </Typography>
        </CardContent>
        <CardActions>
          <Call />
          <Button size="small" color="primary">
            <Link href="https://vcahospitals.com/">View</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
