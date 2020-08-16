import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import { Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 30,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 5,
    marginBottom: 30,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function AboutEdit(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={props.handleClick}
        >
          Back
        </Button>
        <Button size="small" variant="outlined" color="primary">
          Submit changes
        </Button>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Bio</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="Bio"></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Full name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="Full Name"></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Profession</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="Profession"></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>City</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="City"></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Country</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="Country"></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Gender</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="Gender"></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Birthday</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="Birthday"></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>E-mail</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="E-mail"></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Phone number</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField defaultValue="Phone number"></TextField>
          </AccordionDetails>
        </Accordion>
      </div>
    </Card>
  );
}