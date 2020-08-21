import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import grey from "@material-ui/core/colors/grey";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import teal from "@material-ui/core/colors/teal";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: grey[50],
    },
    secondary: {
      main: red[400],
    },
  },
});

export default theme;
