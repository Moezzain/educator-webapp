import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginView from './views/LoginView'
import ShowPatientsView from './views/ShowPatientsView'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from './redux/index'

const App = () => {
  return (

    <PersistGate loading={null} persistor={persistor}>
      <Router 
      >
       

        <Switch>
        <Route exact  path="/" component={LoginView} />
        <Route exact path="/showpatients" component={ShowPatientsView} />
        <Route exact path="/showpatients/:username" component={ShowPatientsView} />
        </Switch>


      </Router>
       </PersistGate>
  );
}

export default App;
