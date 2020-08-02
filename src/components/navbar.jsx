import React from 'react';



const Navbar = () => {
    return ( 
        <div>
<nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
  <a className="navbar-brand" href="signin">Logo</a>
  
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse " id="navbarNav">
    <ul className="navbar-nav mx-auto">
      <li className="nav-item">
        <a className="nav-link" href="feed">Newsfeed</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="profile">Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="profile">Friends</a>
      </li>
      <li className="nav-item ">
        <a className="nav-link" href="#">Petfinder</a>
      </li>
      <li className="nav-item ">
        <a className="nav-link" href="#">Services</a>
      </li>
    </ul>

  </div>

<button className="btn btn-warning"><a href="signin">Sign In</a></button>

  
</nav>
</div>

        );
}


export default Navbar;