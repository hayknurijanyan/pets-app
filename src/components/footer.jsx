import React from "react";

const Footer = () => {
  const isUser = useSelector((state) => state.isUser);
  log("user redux footer", isUser);
  return (
    <footer className="navbar navbar-dark bg-dark fixed-bottom ">
      <div className="navbar-text mx-auto">
        © 2020 Copyright:
        <a className="ml-1" href="#">
          Charo Team
        </a>
      </div>
    </footer>
  );
};

export default Footer;
