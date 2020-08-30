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

function Veterinary() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  const handleViewClick = (e) => {};

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://content.jdmagicbox.com/comp/def_content/veterinary_doctors/default-veterinary-doctors-2.jpg"
          title="Veterinary"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            Veterinary
          </Typography>
          <Typography>
            Highest Quality Vet Care. Services: Emergency Care, Surgery,
            Internal Medicine, Diagnostic Imaging.
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
export default Veterinary;
