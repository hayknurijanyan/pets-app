import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import grey from "@material-ui/core/colors/grey";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import teal from "@material-ui/core/colors/teal";
import deepPurple from "@material-ui/core/colors/deepPurple";

const initialTheme = {
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
const themeSelectReduser = (state = initialTheme, action) => {
  switch (action.type) {
    case "THEME_SELECT_ONE":
      return action.payload;
    case "THEME_SELECT_TWO":
      return action.payload;
    case "DARK_SELECT_ONE":
      return action.payload;
    case "DARK_SELECT_TWO":
      return action.payload;
    default:
      return state;
  }
};

export default themeSelectReduser;
