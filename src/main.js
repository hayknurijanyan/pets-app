import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import App from "./App";

import { useSelector } from "react-redux";
let log = console.log;
function Main(props) {
  const asd = useSelector((state) => state.themeSelect);
  const theme = createMuiTheme(asd);

  log("asd", asd);
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

export default Main;
