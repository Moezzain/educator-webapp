import React from "react";
import logo from "../assets/logo-dark-notext.png";
import { Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar
      bg="secondary"
      variant="dark"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <img
        alt=""
        src={logo}
        width="100"
        height="40"
        className="d-inline-block align-top"
      />
    </Navbar>
  );
};

export default Footer;
