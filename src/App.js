import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginView from './views/LoginView'
import ShowPatientsView from './views/ShowPatientsView'
import { Provider } from 'react-redux';
import store from './redux'

// import { PersistGate } from 'redux-persist/integration/react'
// // import {persistor} from './redux/index'

const App = () => {
  return (
    <Provider store={store}>

      <Router 
      >
       

        <Switch>
        <Route exact  path="/" component={LoginView} />
        <Route exact path="/showpatients" component={ShowPatientsView} />
        <Route exact path="/showpatients/:username" component={ShowPatientsView} />
        </Switch>


      </Router>
    </Provider>
    // <PersistGate loading={null} persistor={persistor}>
      //  </PersistGate>
  );
}

export default App;
