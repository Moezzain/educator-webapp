import React, { Component } from "react";
import {Nav} from 'react-bootstrap'

 class SideBar extends Component {
  render() {
    return (
      <Nav defaultActiveKey="/home" style={{backgroundColor: "#FFF", display: "flex", flexWrap: "wrap" ,position: "relative", left: 0, top: 0}} className="flex-column">
        <Nav.Link  href="/home">Active</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav>
    );
  }
}

export default SideBar;
