import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <div className="header">
      <div className="header-items">
        <Link className="home-link" to="/home">
          <div className="logo">Carrankings</div>
        </Link>
        <div className="search-header">{props.search}</div>

        <div className="navigation">
          <div className="icons-header">{props.rankList}</div>
          <div className="icons-header">{props.userDisplay}</div>
        </div>
      </div>
      <div className="search-header-mobile">{props.search}</div>
    </div>
  );
};

export default Header;
