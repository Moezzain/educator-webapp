import React from 'react';
import './App.css';
import './scss/app.scss'
import {DataProvider} from './stateManagement/context'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import LoginView from './views/LoginView'
import ShowPatientsView from './views/ShowPatientsView'
import Home from './views/Home'
import MyNav from './components/MyNav'
import { Container } from 'react-bootstrap';
import SideBar from './components/SideBar';

function App() {
  return (
    <DataProvider>
      <Router>
      <MyNav /> 
      <SideBar />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginView} />
        <Route exact path="/showpatients" component={ShowPatientsView} />
        </Switch>
      </Router>
   
    </DataProvider>
  );
}

export default App;
