import React from "react";
import SidebarLeft from "./sidebarleft";
import SidebarRight from "./sidebarright";
import { Toolbar } from "@material-ui/core";
import Account from "./account";

const Profile = () => {
  return (
    <div>
      <SidebarLeft />
      <Toolbar />
      <Account/>
      <SidebarRight />
    </div>
  );
};

export default Profile;
