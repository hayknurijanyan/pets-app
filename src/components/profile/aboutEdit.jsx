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
  const {
    bio,
    firstName,
    lastName,
    profession,
    location,
    maleFemale,
    age,
    email,
    contactNumber,
  } = props.data;

  return (
    <Card className={classes.root}>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Bio</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="bio"
              defaultValue={bio}
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
            <Typography className={classes.heading}>First Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="fName"
              defaultValue={firstName}
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
            <Typography className={classes.heading}>Last Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="lName"
              defaultValue={lastName}
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
            <Typography className={classes.heading}>Profession</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="profession"
              defaultValue={profession}
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
            <Typography className={classes.heading}>City</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="city"
              defaultValue={location.city}
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
            <Typography className={classes.heading}>Country</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="country"
              defaultValue={location.country}
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
            <Typography className={classes.heading}>Gender</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="gender"
              defaultValue={maleFemale}
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
              name="age"
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
            <Typography className={classes.heading}>E-mail</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="email"
              defaultValue={email}
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
            <Typography className={classes.heading}>Phone number</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="number"
              defaultValue={contactNumber}
              onChange={(e) => props.handlerInput(e)}
            ></TextField>
          </AccordionDetails>
        </Accordion>
      </div>
    </Card>
  );
}
