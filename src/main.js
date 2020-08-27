import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import App from "./App";
import storage from "local-storage-fallback";
import { theme1 } from "./theme";
import ThemeContext from "./context/themeContext";
let log = console.log;

function getInitialTheme() {
  const savedTheme = storage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : theme1;
}

function Main() {
  const [storageVal, setStorageVal] = useState(getInitialTheme());
  useEffect(() => {
    storage.setItem("theme", JSON.stringify(storageVal));
  }, [storageVal]);

  const theme = createMuiTheme(storageVal);
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={setStorageVal}>
        <App />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default Main;
