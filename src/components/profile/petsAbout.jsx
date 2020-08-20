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
let log = console.log;
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 30,
  },
  back: {
    margin: "15px",
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

  const { age, name, breed, petsGender, behavior } = props.data;
  return (
    <Card className={classes.root}>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="pName"
              defaultValue={name}
              onChange={(e) => props.handlerInput(e)}
            ></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>breed</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="pBreed"
              defaultValue={breed}
              onChange={(e) => props.handlerInput(e)}
            ></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Behavior</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="pBehavior"
              defaultValue={behavior}
              onChange={(e) => props.handlerInput(e)}
            ></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Age</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="pAge"
              defaultValue={age}
              onChange={(e) => props.handlerInput(e)}
            ></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Pets gender</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="pGender"
              defaultValue={petsGender}
              onChange={(e) => props.handlerInput(e)}
            ></TextField>
          </AccordionDetails>
        </Accordion>
      </div>
    </Card>
  );
}
