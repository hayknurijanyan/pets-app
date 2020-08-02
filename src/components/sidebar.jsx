import React from "react";

const Sidebar = () => {
  return (
    <div>
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <a id="menu-toggle" href="#" className="navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </a>
          </div>
          <div id="sidebar-wrapper" className="sidebar-toggle">
            <ul className="sidebar-nav">
              <li>
                <a href="#item1">Item 1</a>
              </li>
              <li>
                <a href="#item2">Item 2</a>
              </li>
              <li>
                <a href="#item3">Item 3</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
