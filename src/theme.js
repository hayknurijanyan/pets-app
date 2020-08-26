import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import grey from "@material-ui/core/colors/grey";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import teal from "@material-ui/core/colors/teal";
import deepPurple from "@material-ui/core/colors/deepPurple";

export const theme1 = {
  palette: {
    primary: {
      main: teal[500],
      contrastText: grey[50],
    },
    secondary: {
      main: red[400],
    },
  },
};

export const theme2 = {
  palette: {
    primary: {
      main: deepPurple[500],
      contrastText: grey[50],
    },
    secondary: {
      main: pink[400],
    },
  },
};

export const dark1 = {
  palette: {
    primary: {
      main: teal[500],
      contrastText: grey[50],
    },
    secondary: {
      main: red[400],
    },
    type: "dark",
  },
};

export const dark2 = {
  palette: {
    primary: {
      main: deepPurple[500],
      contrastText: grey[50],
    },
    secondary: {
      main: pink[400],
    },
    type: "dark",
  },
};
