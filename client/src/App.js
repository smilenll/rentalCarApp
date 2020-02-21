import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Dashboard from './components/dashboard/dashboard';
import Cars from './components/cars/cars';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/cars" component={Cars} />
        <Route render={() => (
          <h1> 404</h1>
        )}
        />
      </Switch>
    </Router>
  );
}

export default App;
