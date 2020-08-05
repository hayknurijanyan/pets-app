import React from "react";
import SidebarLeft from "./sidebarleft";
import SidebarRight from "./sidebarright";
import { Toolbar } from "@material-ui/core";

const Petfinder = () => {
  return (
    <div>
      <SidebarLeft />
      <Toolbar />
      <SidebarRight />
    </div>
  );
};

export default Petfinder;

// let pets = {
//   pet: dog,
//   breed:
// };
