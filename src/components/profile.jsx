import React from "react";
import SidebarLeft from "./sidebarleft";
import SidebarRight from "./sidebarright";
import { Toolbar } from "@material-ui/core";

const Profile = () => {
  return (
    <div>
      <SidebarLeft />
      <Toolbar />
      <h1>Profile Page</h1>
      <SidebarRight />
    </div>
  );
};

export default Profile;
