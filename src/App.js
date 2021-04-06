import React from 'react';
import './App.css';
import {DataProvider} from './stateManagement/context'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginView from './views/LoginView'
import ShowPatientsView from './views/ShowPatientsView'

function App() {
  return (
    <DataProvider>
      <Router>
       

     
      
        <Switch>
        <Route exact path="/" component={LoginView} />
        {/* <Redirect from="/educator-webapp" exact to="/" /> */}
        {/* <Route exact path="/" component={ShowPatientsView} /> */}
        <Route exact path="/showpatients" component={ShowPatientsView} />
        </Switch>
      </Router>
   
    </DataProvider>
  );
}

export default App;
