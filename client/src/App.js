import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/navbar/navbar';
import Dashboard from './components/dashboard/dashboard';
import Cars from './components/cars/cars';
import Rent from './components/rent/rent';
import store from './redux/store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/cars" component={Cars} />
          <Route path="/rent/:carid" component={Rent} />
          <Route render={() => (
            <h1> 404</h1>
          )}
          />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;