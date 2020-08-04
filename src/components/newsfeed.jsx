import React from 'react';
import Posts from './posts';
import SidebarRight from './sidebarright';
import SidebarLeft from './sidebarleft';


function Newsfeed() {

    return (
        <div>
            <SidebarLeft />
            <Posts />
            <SidebarRight />
        </div>
    );
}

export default Newsfeed;