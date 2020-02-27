import React, { Component } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

export class SideBarComponent extends Component {
  render() {
    console.log(this.props);
    return (
      <SideNav
        className="nav-side"
        onSelect={selected => {
          this.props.history.push(selected);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="/">
          <NavItem eventKey="/">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="patients">
            <NavIcon>
              <i className="fa fa-fw fa-users" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Patients</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default SideBarComponent;
