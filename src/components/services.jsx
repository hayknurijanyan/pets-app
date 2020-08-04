import React from 'react';
import SidebarLeft from './sidebarleft';
import SidebarRight from './sidebarright';
import { Toolbar } from '@material-ui/core';

const Services = () => {
    return (
        <div>
            <SidebarLeft />
            <Toolbar />
            <h1>Services</h1>
            <SidebarRight />
        </div>
    );
}

export default Services;