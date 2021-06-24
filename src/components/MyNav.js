/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useContext, useEffect } from 'react';
import logo from '../assets/logo-dark-notext.png';
import { Navbar, Spinner, Nav } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { DataContext } from '../stateManagement/context';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { clearAllAuthAction } from '../redux/reducers/authReducer';
import { clearAllChatsAction } from '../redux/reducers/chatsReducer';
import {
  clearAllEducatorsAction,
  getEducatorsAndPatients,
  setFetchedEducatorIdReducer
} from '../redux/reducers/educatorsReducer';
import {clearAllPatientAction} from '../redux/reducers/patientReducer'
const MyNav = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const { educators, loading, fetchedEducatorId } = useSelector((state) => state.educators);
  const { educatorId, token } = useSelector((state) => state.auth);


  useEffect(() => {
    
    
    dispatch(getEducatorsAndPatients({educatorId, token}));
  }, []);

  const logout = () => {
    dispatch(clearAllAuthAction());
    dispatch(clearAllEducatorsAction());
    dispatch(clearAllChatsAction());
    dispatch(clearAllPatientAction())
    history.replace('/')
  };
  
  const RenderEducator = (id) => {
    dispatch(setFetchedEducatorIdReducer(id));
    
  }
  return (
    <Navbar bg="secondary" variant="dark" collapseOnSelect expand="lg">
      <Navbar.Brand>
        <img
          alt=""
          src={logo}
          width="100"
          height="40"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {Object.keys(educators).length ? (
          <>
            {Object.keys(educators).map((i) => (
              <Nav.Link
                key={educators[i].id}
                style={{ color: '#FFF' }}
                onClick={() => RenderEducator(educators[i].id)}
              >
                {educators[i].name}
              </Nav.Link>
            ))}
            <Nav className="mr-auto ml-10">
              <Nav.Link ><Link style={{ color: "#FFF" }} to="/">Home</Link> </Nav.Link> 
            <Nav.Link>
                <Link style={{ color: '#FFF' }} to="/" onClick={() => logout()}>
                  Logout
                </Link>
         </Nav.Link> 
            </Nav>
          </>
        ) : loading ? (
          <Spinner animation="border" />
        ) : (
          <Nav className="mr-auto">
            <Nav.Link ><Link style={{ color: "#FFF" }} to="/">Home</Link> </Nav.Link> 
           <Nav.Link>
              <Link style={{ color: '#FFF' }} to="/" onClick={() => logout()}>
                Logout
              </Link>
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
