import React from "react";
import logo from "../assets/ithnain.png";
import { Navbar } from "react-bootstrap";

const Footer = () => {
  const date = new Date()
 const currentYear = date.getFullYear()
  return (
    <Navbar
      bg="secondary"
      variant="light"
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   flexDirection: "column"
      // }}
      className="d-flex flex-column justify-content-center align-items-center "
    >
      
      <img
        alt=""
        src={logo}
        width="100"
        height="50"
        className="d-inline-block align-top"
      />
      <p className="text-white">&copy; {currentYear} ithnain.com</p>
    </Navbar>
  );
};

export default Footer;
