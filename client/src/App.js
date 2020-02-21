import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Dashboard from './components/dashboard/dashboard';
import Cars from './components/cars/cars';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/cars" component={Cars} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
