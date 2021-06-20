import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginView from './views/LoginView'
import ShowPatientsView from './views/ShowPatientsView'
const App = () => {
  return (
      <Router 
      >
       

     
        {/* <div> */}
        <Switch>
        <Route exact  path="/" component={LoginView} />
        <Route exact path="/showpatients" component={ShowPatientsView} />
        <Route exact path="/showpatients/:username" component={ShowPatientsView} />
        </Switch>

        {/* </div> */}
      </Router>
  );
}

export default App;
