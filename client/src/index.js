import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import App from './App';
import Cities from './components/Cities';
import Login from './components/Login';
import Create from './components/Create-account';
import Itineraries from './components/Itineraries';
import Dashboard from './components/Dashboard';
import GoogleSign from './components/GoogleSign';


import * as serviceWorker from './serviceWorker';
import{Provider} from 'react-redux';
import {store, persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './components/PrivateRoute';



const routing = (
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/cities" component={Cities} />
            <Route path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="/itineraries/:cityID" component={Itineraries} />
            </Switch>
            <Route path="/googleSign/:token" component={GoogleSign} />
            <Route path="/create-account" component={Create} />
          </div>
        </Router>
     </PersistGate>
  </Provider>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
