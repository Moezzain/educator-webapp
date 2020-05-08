import React, { Component, useContext } from "react";
import logo from '../assets/ithnain.png'
import { Navbar, Spinner, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {DataContext} from '../stateManagement/context'

const MyNav = (props) => {

  const {educators, setEducatorId, loading}= useContext(DataContext)

  return (
    <Navbar bg="secondary" variant="dark" collapseOnSelect expand="lg">
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
        {Object.keys(educators).length ?
          Object.keys(educators).map((i) => (
            <Nav.Link key={educators[i].id} style={{ color: "#FFF" }} onClick={()=>setEducatorId(educators[i].id)} >{educators[i].name}</Nav.Link>
          ))
          : loading? 
          <Spinner animation="border" />
          : <Nav className="mr-auto">
            {/* <Nav.Link ><Link style={{ color: "#FFF" }} to="/">Home</Link> </Nav.Link> */}
            <Nav.Link ><Link style={{ color: "#FFF" }} to="/">Logout</Link></Nav.Link>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );

}

export default MyNav;
