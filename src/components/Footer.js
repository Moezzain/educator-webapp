import React from "react";
import logo from "../assets/logo-dark-notext.png";
import AppBar from '@material-ui/core/AppBar';
import {darkStyles,lightStyles} from '../styles/myNavStyles'
import { useSelector } from "react-redux";
const Footer = () => {
  const {darkMode } = useSelector((state) => state.auth)

  const styles = !darkMode ? lightStyles : darkStyles

  return (
    <AppBar position="fixed" color="black" style={styles.footerAppBar}>
      <img
        alt=""
        src={logo}
        width="100"
        height="40"
        className="d-inline-block align-top"
        style={styles.footerLogo}
      />
    </AppBar>
  );
};

export default Footer;
