import React, { Component } from "react";
import logo from '../assets/ithnain.png'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const MyNav  = () => {
  
    return (
      <Navbar bg="secondary" style={{direction: "rtl"}} variant="dark" collapseOnSelect expand="lg">
        <Navbar.Brand >
          <img
            alt=""
            src={logo}
            width="80"
            height="40"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav>
      <Nav.Link ><Link style={{color: "#FFF"}} to="/">Home</Link> </Nav.Link>
      <Nav.Link ><Link style={{color: "#FFF"}} to="/login">Login</Link></Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
    );
  
}

export default MyNav;
