import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';




const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
            contrastText: grey[50]
        },
        secondary: {
            main: amber[500],
        },

    },
});

export default theme;